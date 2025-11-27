import { UserCreateDto } from '@common/shared/dtos/user/user-create.dto';
import { UserService } from '@apps/authentication/src/modules/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AuthRegisterResponse } from '@common/shared/responses/token.response';
import { UserResponse } from '@common/shared/responses/user.response';
import { UserLoginDto } from '@common/shared/dtos/user/user-login.dto';
import { comparePassword } from '@core/helpers/password.helper';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: UserCreateDto): Promise<AuthRegisterResponse> {
    const user = await this.userService.create(data);

    const payload = { sub: user._id.toString(), email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return new AuthRegisterResponse({
      user: new UserResponse({
        id: user._id.toString(),
        name: user.name,
        age: user.age,
        email: user.email,
      }),
      token,
    });
  }

  async login(data: UserLoginDto): Promise<AuthRegisterResponse> {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new RpcException({
        message: 'Invalid credentials',
        statusCode: 400,
      });
    }

    const compared = await comparePassword(data.password, user.password);

    if (!compared) {
      throw new RpcException({
        message: 'Invalid credentials',
        statusCode: 400,
      });
    }

    const payload = { sub: user._id.toString(), email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return new AuthRegisterResponse({
      user: new UserResponse({
        id: user._id.toString(),
        name: user.name,
        age: user.age,
        email: user.email,
      }),
      token,
    });
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      if (!payload) {
        return null;
      }

      return payload;
    } catch (e) {
      return null;
    }
  }
}
