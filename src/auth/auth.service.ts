import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.usersService.findByLogin(loginDto.login);

    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Incorrect login or password');
    }

    const payload = { id: user.id, login: user.login };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  async signUp(signupDto: SignupDto): Promise<void> {
    const existingUser = await this.usersService.findByLogin(signupDto.login);

    if (existingUser) {
      throw new ConflictException('Login already exists');
    }

    await this.usersService.create({
      login: signupDto.login,
      password: signupDto.password,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
