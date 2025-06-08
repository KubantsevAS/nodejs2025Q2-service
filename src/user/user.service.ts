import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AppService } from '../app.service';

@Injectable()
export class UserService extends AppService<User> {
  constructor() {
    super();
  }

  protected getModelName(): string {
    return 'user';
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData: Omit<User, 'id'> = {
      ...createUserDto,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return super.create(userData);
  }

  async findAll(): Promise<User[]> {
    return await super.findAll();
  }

  async findOne(id: string): Promise<User> {
    return super.findById(id);
  }

  async updateUserPassword(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    if (updateUserDto.oldPassword === updateUserDto.newPassword) {
      throw new ForbiddenException(
        'The new password must be different from the previous',
      );
    }

    const updateData: Partial<User> = {
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: new Date(),
    };

    return await this.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    await super.remove(id);
  }
}
