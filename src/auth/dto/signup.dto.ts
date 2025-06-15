import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  login: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]{3,30}$/, {
    message:
      'Password must contain only letters and numbers, and be between 3 and 30 characters',
  })
  password: string;
}
