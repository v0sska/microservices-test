import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserCreateDto } from '@common/shared/dtos/user/user-create.dto';
import { AuthRegisterResponse } from '@common/shared/responses/token.response';
import { UserResponse } from '@common/shared/responses/user.response';
import { firstValueFrom } from 'rxjs';
import { UserLoginDto } from '@common/shared/dtos/user/user-login.dto';

@Injectable()
export class AuthProxyService {
  constructor(@Inject('AUTHENTICATION_SERVICE') private client: ClientProxy) {}

  public async register(data: UserCreateDto): Promise<AuthRegisterResponse> {
    try {
      return await firstValueFrom(this.client.send('auth.register', data));
    } catch (err) {
      throw new HttpException(
        err.message ?? 'Internal error',
        err.statusCode ?? 500,
      );
    }
  }

  public async login(data: UserLoginDto): Promise<AuthRegisterResponse> {
    try {
      return await firstValueFrom(this.client.send('auth.login', data));
    } catch (err) {
      throw new HttpException(
        err.message ?? 'Internal error',
        err.statusCode ?? 500,
      );
    }
  }

  public async userIndex(): Promise<UserResponse[]> {
    const response = await firstValueFrom(this.client.send('user-index', {}));

    return response;
  }
}
