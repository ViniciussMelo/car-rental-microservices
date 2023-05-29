import { Injectable } from '@nestjs/common';

import { ICreateUser } from '@modules/users/interfaces/create-user.interface';
import { DatabaseService } from '@modules/database/services/database.service';
import { User } from '@prisma/client';

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
}
