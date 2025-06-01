import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create({ login, password }: CreateUserDto): UserResponseDto {
    const user = {
      id: uuidV4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  findAll(): UserResponseDto[] {
    return plainToInstance(UserResponseDto, this.users || [], {
      excludeExtraneousValues: true,
    });
  }

  findOne(id: string): UserResponseDto {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    return user
      ? plainToInstance(UserResponseDto, user, {
          excludeExtraneousValues: true,
        })
      : null;
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    if (oldPassword === newPassword) {
      throw new ForbiddenException(
        'The new password must be different from the previous',
      );
    }

    user.password = newPassword;

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  remove(id: string): void {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    this.users.splice(this.users.indexOf(user), 1);
  }
}
