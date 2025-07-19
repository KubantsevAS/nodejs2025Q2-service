import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

@Exclude()
export class UserResponseDto implements Omit<User, 'password'> {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Expose()
  version: number;

  @Expose()
  createdAt: number;

  @Expose()
  updatedAt: number;
}
