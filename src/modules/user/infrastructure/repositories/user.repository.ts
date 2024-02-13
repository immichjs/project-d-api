import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { CryptService } from 'src/modules/shared/services/crypt/crypt.service';
import { UserRepositoryAbstract } from '../interfaces/user-repository.abstract';

@Injectable()
export class UserRepository extends UserRepositoryAbstract {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptService: CryptService,
  ) {
    super();
  }

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
