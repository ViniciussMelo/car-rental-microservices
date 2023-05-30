import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetUserDto {
  @ApiProperty({
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'user name',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'email@email.com',
  })
  @Expose()
  email: string;
}
