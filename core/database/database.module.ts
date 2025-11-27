import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentModule } from 'core/environment/environment.module';
import { EnvironmentService } from 'core/environment/environment.service';

@Module({
  imports: [
    EnvironmentModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: async (env: EnvironmentService) => ({
        uri: env.getMongoUri(),
      }),
    }),
  ],
})
export class DatabaseModule {}
