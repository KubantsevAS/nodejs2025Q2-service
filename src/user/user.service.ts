import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AppService } from '../app.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService extends AppService<User> {
  constructor() {
    super();
  }

  protected getModelName(): string {
    return 'user';
  }

  private toDto(user: User): UserDto {
    return new UserDto(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const userData: Omit<User, 'id'> = {
      ...createUserDto,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = await super.create(userData);

    return this.toDto(user);
  }

  async findAllUsers(): Promise<UserDto[]> {
    const users = await super.findAll();

    return users.map((user) => this.toDto(user));
  }

  async findUserById(id: string): Promise<UserDto> {
    const user = await super.findById(id);

    return this.toDto(user);
  }

  async updateUserPassword(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
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

    const updatedUser = await this.update(id, updateData);

    return this.toDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    await super.remove(id);
  }
}
