import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';

export class AuthRegisterResponse {
  @ApiProperty({ type: UserResponse })
  readonly user: UserResponse;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  readonly token: string;

  constructor(partial: Partial<AuthRegisterResponse>) {
    Object.assign(this, partial);
  }
}
