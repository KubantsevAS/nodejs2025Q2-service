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
      console.log('Attempting to sign in with login:', loginDto.login);
      console.log('Attempting to sign in with password:', loginDto.password);

      const user = await this.usersService.findByLogin(loginDto.login);
      console.log('Found user:', user ? 'yes' : 'no');
      console.log('Found user login:', user.login);
      console.log('Found user password:', user.password);

      if (!user) {
        throw new UnauthorizedException('Incorrect login or password');
      }

      console.log('Comparing passwords...');
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      console.log('Password valid:', isPasswordValid);

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
      console.error('SignIn error:', error);
      throw error;
    }
  }

  async signUp(signupDto: SignupDto): Promise<{ id: string }> {
    try {
      console.log('Attempting to sign up with login:', signupDto.login);

      const existingUser = await this.usersService.findByLogin(signupDto.login);
      console.log('Existing user found:', existingUser ? 'yes' : 'no');

      if (existingUser) {
        throw new ConflictException('Login already exists');
      }

      const saltRounds = parseInt(process.env.CRYPT_SALT || '10', 10);
      console.log('Using salt rounds:', saltRounds);

      const hashedPassword = await bcrypt.hash(signupDto.password, saltRounds);
      console.log('Password hashed successfully');

      const user = await this.usersService.createUser({
        login: signupDto.login,
        password: hashedPassword,
      });
      console.log('User created with ID:', user.id);

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
      const accessToken = await this.jwtService.signAsync(newPayload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      });
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
