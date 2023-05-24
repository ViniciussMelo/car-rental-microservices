import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  JWT_EXPIRES_IN_REFRESH_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  USER_TOKEN_REPOSITORY,
} from '@shared/constants';
import {
  IPayloadInterface,
  ITokenResponse,
} from '@modules/authentication/interfaces';
import { User } from '@modules/user/models/user.model';
import { UserToken } from '@modules/user/models/user-token.model';
import { DateFormat } from '@shared/utils/date-format.shared';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(USER_TOKEN_REPOSITORY)
    private readonly userTokenRepository: typeof UserToken,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: User): Promise<ITokenResponse> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    await this.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);

      return true;
    } catch (err) {
      return false;
    }
  }

  async decodeToken(token: string): Promise<User> {
    return this.jwtService.decode(token) as User;
  }

  private async saveToken(userId: number, refreshToken: string) {
    await this.userTokenRepository.destroy({ where: { userId } });

    await this.userTokenRepository.create({
      userId,
      refreshToken,
      expiresDate: DateFormat.addDays(
        new Date(),
        parseInt(JWT_EXPIRES_IN_REFRESH_TOKEN),
      ),
    });
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload: IPayloadInterface = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const payload: IPayloadInterface = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: JWT_EXPIRES_IN_REFRESH_TOKEN,
      secret: JWT_SECRET_REFRESH_TOKEN,
    });
  }
}
