import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetUserByIdDto } from '@modules/users/dtos/get-user-by-id.dto';
import { UserService } from '@modules/users/services/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  @ApiOkResponse({ type: GetUserByIdDto, status: HttpStatus.OK })
  getByUser(@Param('userId') userId: number): Promise<GetUserByIdDto> {
    return this.userService.getByUserId(userId);
  }
}
