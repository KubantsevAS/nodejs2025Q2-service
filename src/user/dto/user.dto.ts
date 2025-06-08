import { User } from '@prisma/client';

export class UserDto implements Omit<User, 'createdAt' | 'updatedAt'> {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(user: User) {
    this.id = user.id;
    this.login = user.login;
    this.password = user.password;
    this.version = user.version;
    this.createdAt = user.createdAt.getTime();
    this.updatedAt = user.updatedAt.getTime();
  }
}
