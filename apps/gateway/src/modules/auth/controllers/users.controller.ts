import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerTagsEnum } from '@common/shared/enums/swagger-tags.enum';
import { AuthProxyService } from '@apps/gateway/src/modules/auth/services/auth.service';
import { AuthGuard } from '@apps/gateway/src/modules/auth/guards/auth.guard';
import { UserResponse } from '@common/shared/responses/user.response';
import { ResponseMapper } from '@common/shared/mappers/response.mapper';

@Controller('auth')
@ApiTags(SwaggerTagsEnum.AUTH_USER)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly authProxyService: AuthProxyService) {}

  @Get('users')
  @ApiOperation({
    operationId: UsersController.name + '-index',
    summary: 'Get a list of users',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    type: UserResponse,
  })
  public async index(): Promise<ResponseMapper<UserResponse[]>> {
    const result: UserResponse[] = await this.authProxyService.userIndex();

    return new ResponseMapper(result, 200);
  }
}
