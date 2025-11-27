import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  readonly id?: string;

  @ApiProperty({ example: 'John Doe' })
  readonly name: string;

  @ApiProperty({ example: 30 })
  readonly age: number;

  @ApiProperty({ example: 'user@example.com' })
  readonly email: string;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
