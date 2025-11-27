import { Module } from '@nestjs/common';
import { UserModule } from '@apps/authentication/src/modules/user/user.module';
import { AuthMessageController } from '@apps/authentication/src/modules/auth/controllers/auth.message.controller';
import { AuthService } from '@apps/authentication/src/modules/auth/services/auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthMessageController],
  providers: [AuthService],
})
export class AuthModule {}
