import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import getMongoConfig from 'config/mongodb.config';
import { EnvironmentService } from './environment.service';
import * as path from 'path';
import getJwtConfig from 'config/jwt.config';
import getAuthConfig from 'config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      envFilePath: path.join(process.cwd(), '.env'),
      load: [getMongoConfig(), getJwtConfig(), getAuthConfig()],
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
