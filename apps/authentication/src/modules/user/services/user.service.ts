import { Injectable } from '@nestjs/common';
import { UserRepository } from '@apps/authentication/src/modules/user/repository/user.repository';
import { UserCreateDto } from '@common/shared/dtos/user/user-create.dto';
import UserMapper from '@apps/authentication/src/modules/user/mappers/user.mapper';
import { User } from '@apps/authentication/src/modules/user/entities/user.entity';
import hashPassword from 'core/helpers/password.helper';
import { UserResponse } from '@common/shared/responses/user.response';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(data: UserCreateDto): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new RpcException({
        statusCode: 400,
        message: 'User with this email already exists',
      });
    }

    const userEntity = UserMapper.toEntity(data);

    const passwordHash = await hashPassword(data.password);
    userEntity.password = passwordHash;

    return await this.userRepository.create(userEntity);
  }

  public async findAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.find();

    return users.map(
      (user) =>
        new UserResponse({
          id: user._id.toString(),
          name: user.name,
          age: user.age,
          email: user.email,
        }),
    );
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
}
