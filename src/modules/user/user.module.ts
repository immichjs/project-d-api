import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from './domain/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { SharedModule } from '../../utils/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
