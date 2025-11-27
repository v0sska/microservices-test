import { Module } from '@nestjs/common';
import { AuthModule } from '@apps/gateway/src/modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from '@common/interceptors/error.interceptor';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class GatewayModule {}
