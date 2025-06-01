import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Put,
  HttpCode,
  Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body() createUserDto: CreateUserDto): UserResponseDto {
    const user = this.userService.create(createUserDto);

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll(): UserResponseDto[] {
    const users = this.userService.findAll();

    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string): UserResponseDto {
    const user = this.userService.findOne(id);

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserResponseDto {
    const user = this.userService.updateUserPassword(id, updateUserDto);

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.userService.remove(id);
  }
}
