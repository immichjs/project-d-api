import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserRepositoryAbstract } from '../interfaces/user-repository.abstract';
import { CryptService } from '../../../../utils/shared/services/crypt/crypt.service';
import { UserStatus } from 'src/utils/enums/user-status.enum';

@Injectable()
export class UserRepository extends UserRepositoryAbstract {
  @InjectRepository(User) private readonly userRepository: Repository<User>;
  @Inject() private readonly cryptService: CryptService;

  public async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  public async create({
    name,
    email,
    phone,
    password,
  }: CreateUserDto): Promise<User> {
    const hasUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (hasUser) {
      throw new ConflictException('Already user exists.');
    }

    const encryptedPassword = this.cryptService.encrypt(password);

    const user = this.userRepository.create({
      name,
      email,
      phone,
      password: encryptedPassword,
      status: UserStatus.INACTIVE,
    });

    const savedUser = await this.userRepository.save(user);
    savedUser.password = undefined;

    return savedUser;
  }

  public async delete(userId: string): Promise<void> {
    const user = await this.findOne(userId);

    await this.userRepository.remove(user);
  }
}
