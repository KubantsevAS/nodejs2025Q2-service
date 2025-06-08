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
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id') id: string) {
    return await this.artistService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.artistService.remove(id);
  }
}
