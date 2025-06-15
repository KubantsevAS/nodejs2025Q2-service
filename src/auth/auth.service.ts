import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userId: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserById(userId);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, login: user.login };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
