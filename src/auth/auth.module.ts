import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'src/logger/logger.module';
import { FiltersModule } from 'src/filters/filters.module';

@Module({
  imports: [
    LoggerModule,
    FiltersModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'LOGGER_CONTEXT',
      useValue: 'auth',
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
