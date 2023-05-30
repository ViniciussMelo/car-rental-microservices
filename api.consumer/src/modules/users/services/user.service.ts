import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

import { ICreateUser } from '@modules/users/interfaces/create-user.interface';
import { DatabaseService } from '@modules/database/services/database.service';
import { GetUserByIdDto } from '@modules/users/dtos/get-user-by-id.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(user: ICreateUser): Promise<User> {
    return this.databaseService.user.create({
      data: {
        id: user.sub,
        name: user.name,
        email: user.email,
        rentals: [],
      },
    });
  }

  async getByUserId(userId: number): Promise<GetUserByIdDto> {
    const user = await this.databaseService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return GetUserByIdDto.factory(user);
  }
}
