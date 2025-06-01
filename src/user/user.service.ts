import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AppService } from '../app.service';

@Injectable()
export class UserService extends AppService<User> {
  constructor() {
    super();
  }

  create(createUserDto: CreateUserDto): User {
    return super.create({
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as User);
  }

  findAll(): User[] {
    return super.findAll();
  }

  findOne(id: string): User {
    return super.findById(id);
  }

  updateUserPassword(id: string, updateUserDto: UpdateUserDto): User {
    const user = super.findById(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    if (updateUserDto.oldPassword === updateUserDto.newPassword) {
      throw new ForbiddenException(
        'The new password must be different from the previous',
      );
    }

    return super.update(id, {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    } as Omit<User, 'id'>);
  }

  remove(id: string): void {
    super.remove(id);
  }
}
