import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { EnvironmentModule } from 'core/environment/environment.module';
import { EnvironmentService } from 'core/environment/environment.service';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      global: true,
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (env: EnvironmentService) => ({
        secret: env.getJwtSecret() ?? 'default_secret',
        signOptions: {
          expiresIn: (env.getJwtExpiresIn() ??
            '1h') as `${number}${'s' | 'm' | 'h' | 'd'}`,
        },
      }),
    }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
