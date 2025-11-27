import { Controller } from '@nestjs/common';
import { UserService } from '@apps/authentication/src/modules/user/services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserResponse } from '@common/shared/responses/user.response';

@Controller('user')
export class UserMessageController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user-index')
  public async index(): Promise<UserResponse[]> {
    return await this.userService.findAll();
  }
}
