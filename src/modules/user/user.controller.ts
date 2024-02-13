import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { User } from './domain/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  @Inject() private readonly userService: UserService;

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Get()
  public async find() {
    return this.userService.find();
  }

  @Get(':userId')
  public async findOne(
    @Param(
      'userId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    userId: string,
  ) {
    return this.userService.findOne(userId);
  }

  @Delete(':userId')
  public async delete(
    @Param(
      'userId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    userId: string,
  ) {
    return this.userService.delete(userId);
  }
}
