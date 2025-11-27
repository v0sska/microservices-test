import { UserCreateDto } from 'common/shared/dtos/user/user-create.dto';
import { User } from '@apps/authentication/src/modules/user/entities/user.entity';

export default class UserMapper {
  static toEntity(data: UserCreateDto): Partial<User> {
    return {
      email: data.email,
      name: data.name,
      age: data.age,
    };
  }
}
