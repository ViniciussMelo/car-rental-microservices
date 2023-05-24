import {
  Inject,
  Injectable,
  CACHE_MANAGER,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { RegisterUserDto, LoginDto } from '@modules/authentication/dtos';
import { User } from '@modules/authentication/models/user.model';
import { BcryptHash } from '@shared/bcrypt-hash.shared';
import { USER_REPOSITORY } from '@constants/index';
import { AppError } from '@errors/app.error';

@Injectable()
export class AuthenticationService {
  private readonly twentyFourHours = parseInt(process.env.TTL_TIME) ?? 86460;
  private readonly cachePrefix = 'auth';

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,

    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create({ email, name, password }: RegisterUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new AppError(
        HttpStatus.CONFLICT,
        'Already exists a user with this email!',
      );
    }

    const key = this.getKey(email);

    password = await BcryptHash.hashPassword(password);

    await this.userRepository.create({
      email,
      name,
      password,
    });

    await this.cacheManager.set(key, { user }, this.twentyFourHours);
  }

  async login({ email, password }: LoginDto) {
    const key = this.getKey(email);

    const cachedUser = await this.cacheManager.get(key);

    if (cachedUser) {
      return true;
    }

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const isSamePassword = await BcryptHash.verifyPassword(
      password,
      user.password,
    );

    if (!user || !isSamePassword) {
      throw new AppError(HttpStatus.UNAUTHORIZED);
    }

    await this.cacheManager.set(key, { user }, this.twentyFourHours);

    return true;
  }

  async delete({ email, password }: LoginDto) {
    const key = this.getKey(email);

    await this.cacheManager.del(key);
    // to do
  }

  private getKey(email: string): string {
    return `${this.cachePrefix}-${email}`;
  }
}
