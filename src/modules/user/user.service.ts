import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { User } from './domain/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  @Inject() private readonly userRepository: UserRepository;

  public async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  public async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.create(dto);
  }

  public async delete(userId: string): Promise<void> {
    return this.userRepository.delete(userId);
  }
}
