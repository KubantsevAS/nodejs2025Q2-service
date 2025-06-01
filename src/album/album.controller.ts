import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
  Header,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { validate as isUuid } from 'uuid';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body() createAlbumDto: AlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Track Id is invalid (not uuid)');
    }

    return this.albumService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateAlbumDto: AlbumDto) {
    if (!isUuid(id)) {
      throw new BadRequestException('Track Id is invalid (not uuid)');
    }

    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Track Id is invalid (not uuid)');
    }

    return this.albumService.remove(id);
  }
}
