import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerTagsEnum } from '@common/shared/enums/swagger-tags.enum';
import { ResponseMapper } from '@common/shared/mappers/response.mapper';
import { AuthRegisterResponse } from '@common/shared/responses/token.response';
import { AuthProxyService } from '@apps/gateway/src/modules/auth/services/auth.service';
import { UserLoginDto } from '@common/shared/dtos/user/user-login.dto';

@Controller('auth')
@ApiTags(SwaggerTagsEnum.AUTH)
export class LoginController {
  constructor(private readonly authProxyService: AuthProxyService) {}
  @Post('login')
  @ApiOperation({
    operationId: LoginController.name + '-login',
    summary: 'User login',
  })
  @ApiResponse({
    status: 201,
    description: 'User logged in successfully',
    type: AuthRegisterResponse,
  })
  public async login(
    @Body() data: UserLoginDto,
  ): Promise<ResponseMapper<AuthRegisterResponse>> {
    const result: AuthRegisterResponse =
      await this.authProxyService.login(data);

    return new ResponseMapper(result, 201);
  }
}
