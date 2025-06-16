import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthResponse } from './types/auth.types';
import { LoggerService } from '../logger/logger.service';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      this.logger.log('Login attempt', { login: loginDto.login });

      const user = await this.usersService.findByLogin(loginDto.login);

      if (!user) {
        this.logger.warn('Login failed: User not found', {
          login: loginDto.login,
        });
        throw new UnauthorizedException('Incorrect login or password');
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        this.logger.warn('Login failed: Invalid password', {
          login: loginDto.login,
        });
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

      this.logger.log('Login successful', { userId: user.id });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('Login error', { error: error.message });

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException('An error occurred during login');
    }
  }

  async signUp(signupDto: SignupDto): Promise<UserResponseDto> {
    try {
      this.logger.log('Signup attempt', { login: signupDto.login });

      const existingUser = await this.usersService.findByLogin(signupDto.login);

      if (existingUser) {
        this.logger.warn('Signup failed: Login already exists', {
          login: signupDto.login,
        });
        throw new ConflictException('Login already exists');
      }

      const saltRounds = parseInt(process.env.CRYPT_SALT || '10', 10);
      const hashedPassword = await bcrypt.hash(signupDto.password, saltRounds);

      const user = await this.usersService.createUser({
        login: signupDto.login,
        password: hashedPassword,
      });

      this.logger.log('Signup successful', { userId: user.id });

      return this.usersService.toDto(user);
    } catch (error) {
      this.logger.error('Signup error', { error: error.message });

      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('An error occurred during signup');
    }
  }

  async refresh(refreshDto: RefreshDto): Promise<AuthResponse> {
    try {
      this.logger.log('Token refresh attempt');

      const payload = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET_KEY,
        },
      );

      const user = await this.usersService.findUserById(payload.id);

      if (!user) {
        this.logger.warn('Token refresh failed: User not found', {
          userId: payload.id,
        });
        throw new UnauthorizedException('User not found');
      }

      const newPayload = { id: user.id, login: user.login };
      const accessToken = await this.jwtService.signAsync(newPayload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      });
      const refreshToken = await this.jwtService.signAsync(newPayload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
      });

      this.logger.log('Token refresh successful', { userId: user.id });
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('Token refresh error', { error: error.message });
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
