import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  ValidationPipe,
  UsePipes,
  Put,
  HttpCode,
  Header,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('User Id is invalid (not uuid)');
    }

    return this.userService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!isUuid(id)) {
      throw new BadRequestException('User Id is invalid (not uuid)');
    }

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('User Id is invalid (not uuid)');
    }

    this.userService.remove(id);
  }
}
