import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from '@common/shared/dtos/user/user-create.dto';
import { SwaggerTagsEnum } from '@common/shared/enums/swagger-tags.enum';
import { ResponseMapper } from '@common/shared/mappers/response.mapper';
import { AuthRegisterResponse } from '@common/shared/responses/token.response';
import { AuthProxyService } from '@apps/gateway/src/modules/auth/services/auth.service';

@Controller('auth')
@ApiTags(SwaggerTagsEnum.AUTH)
export class RegisterController {
  constructor(private readonly authProxyService: AuthProxyService) {}
  @Post('register')
  @ApiOperation({
    operationId: RegisterController.name + '-create',
    summary: 'Create a new user registration',
  })
  @ApiResponse({
    status: 201,
    description: 'User registration created successfully',
    type: AuthRegisterResponse,
  })
  public async register(
    @Body() data: UserCreateDto,
  ): Promise<ResponseMapper<AuthRegisterResponse>> {
    const result: AuthRegisterResponse =
      await this.authProxyService.register(data);

    return new ResponseMapper(result, 201);
  }
}
