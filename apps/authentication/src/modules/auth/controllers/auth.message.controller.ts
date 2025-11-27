import { Controller } from '@nestjs/common';
import { AuthService } from '@apps/authentication/src/modules/auth/services/auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserCreateDto } from '@common/shared/dtos/user/user-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthRegisterResponse } from '@common/shared/responses/token.response';
import { UserLoginDto } from '@common/shared/dtos/user/user-login.dto';

@Controller()
@ApiTags('Authentication')
export class AuthMessageController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  public async register(data: UserCreateDto): Promise<AuthRegisterResponse> {
    return await this.authService.register(data);
  }

  @MessagePattern('auth.login')
  public async login(data: UserLoginDto): Promise<AuthRegisterResponse> {
    return await this.authService.login(data);
  }

  @MessagePattern('auth.verifyToken')
  public async verifyToken(token: string) {
    return await this.authService.verifyToken(token);
  }
}
