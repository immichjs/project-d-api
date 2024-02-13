import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';

export abstract class UserRepositoryAbstract {
  abstract create(dto: CreateUserDto): Promise<User>;

  abstract find(): Promise<User[]>;

  abstract findOne(userId: string): Promise<User>;

  abstract delete(userId: string): Promise<void>;
}
