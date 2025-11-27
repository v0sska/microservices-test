import { Module } from '@nestjs/common';
import { UserService } from '@apps/authentication/src/modules/user/services/user.service';
import { UserRepository } from '@apps/authentication/src/modules/user/repository/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '@apps/authentication/src/modules/user/entities/user.entity';
import { UserMessageController } from '@apps/authentication/src/modules/user/controllers/user.message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserMessageController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
