import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// interface UpdatePasswordDto {
//     oldPassword: string; // previous password
//     newPassword: string; // new password
//   }
