import { Module } from '@nestjs/common';
import { AuthProxyService } from '@apps/gateway/src/modules/auth/services/auth.service';
import { RegisterController } from '@apps/gateway/src/modules/auth/controllers/register.controller';
import { UsersController } from '@apps/gateway/src/modules/auth/controllers/users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvironmentService } from '@core/environment/environment.service';
import { EnvironmentModule } from '@core/environment/environment.module';
import { LoginController } from './controllers/login.controller';

@Module({
  imports: [
    EnvironmentModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTHENTICATION_SERVICE',
        imports: [EnvironmentModule],
        inject: [EnvironmentService],
        useFactory: (environmentService: EnvironmentService) => ({
          transport: Transport.TCP,
          options: {
            host: environmentService.getAuthServiceHost(),
            port: environmentService.getAuthServicePort(),
          },
        }),
      },
    ]),
  ],
  providers: [AuthProxyService],
  controllers: [RegisterController, UsersController, LoginController],
})
export class AuthModule {}
