import { InjectModel } from '@nestjs/mongoose';
import { User } from '@apps/authentication/src/modules/user/entities/user.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async create(data: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  public async find(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
