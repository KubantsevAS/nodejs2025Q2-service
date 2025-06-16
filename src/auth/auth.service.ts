import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthResponse } from './types/auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const user = await this.usersService.findByLogin(loginDto.login);

      if (!user) {
        throw new UnauthorizedException('Incorrect login or password');
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Incorrect login or password');
      }

      const payload = { id: user.id, login: user.login };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async signUp(signupDto: SignupDto): Promise<{ id: string }> {
    try {
      const existingUser = await this.usersService.findByLogin(signupDto.login);

      if (existingUser) {
        throw new ConflictException('Login already exists');
      }

      const saltRounds = parseInt(process.env.CRYPT_SALT || '10', 10);
      const hashedPassword = await bcrypt.hash(signupDto.password, saltRounds);

      const user = await this.usersService.createUser({
        login: signupDto.login,
        password: hashedPassword,
      });

      return { id: user.id };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async refresh(refreshDto: RefreshDto): Promise<AuthResponse> {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET_KEY,
        },
      );

      const user = await this.usersService.findUserById(payload.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload = { id: user.id, login: user.login };
      const accessToken = await this.jwtService.signAsync(newPayload);
      const refreshToken = await this.jwtService.signAsync(newPayload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
