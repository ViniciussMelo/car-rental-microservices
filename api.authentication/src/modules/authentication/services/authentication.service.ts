import {
  Inject,
  Injectable,
  CACHE_MANAGER,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { RegisterUserDto, LoginDto } from '@modules/authentication/dtos';
import { User } from '@modules/authentication/models/user.model';
import { BcryptHash } from '@shared/bcrypt-hash.shared';
import { USER_REPOSITORY } from '@constants/index';

@Injectable()
export class AuthenticationService {
  private readonly cachePrefix = 'auth';

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,

    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(params: RegisterUserDto) {
    // to do
  }

  async login({ email, password }: LoginDto) {
    try {
      const key = `${this.cachePrefix}-${email}`;

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
        throw new UnauthorizedException();
      }

      const twentyFourHours = parseInt(process.env.TTL_TIME) ?? 86460;

      await this.cacheManager.set(key, { user }, twentyFourHours);

      return true;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async delete({ email, password }: LoginDto) {
    const key = `${this.cachePrefix}-${email}`;

    await this.cacheManager.del(key);
    // to do
  }
}
