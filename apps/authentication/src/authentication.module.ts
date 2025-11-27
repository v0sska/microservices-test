import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@core/environment/environment.module';
import { DatabaseModule } from '@core/database/database.module';
import { JwtModule } from '@core/jwt/jwt.module';
import { UserModule } from '@apps/authentication/src/modules/user/user.module';
import { AuthModule } from '@apps/authentication/src/modules/auth/auth.module';

@Module({
  imports: [
    EnvironmentModule,
    DatabaseModule,
    JwtModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthenticationModule {}
