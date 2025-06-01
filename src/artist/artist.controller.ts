import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  UsePipes,
  Header,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';
import { validate as isUuid } from 'uuid';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body() createArtistDto: ArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Artist Id is invalid (not uuid)');
    }

    return this.artistService.findOne(id);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateArtistDto: ArtistDto) {
    if (!isUuid(id)) {
      throw new BadRequestException('Artist Id is invalid (not uuid)');
    }

    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Artist Id is invalid (not uuid)');
    }

    return this.artistService.remove(id);
  }
}
