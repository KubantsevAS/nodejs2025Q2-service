import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  Header,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAllFavs() {
    return await this.favsService.findAllFavs();
  }

  @Post('/track/:id')
  @Header('Content-Type', 'application/json')
  async addTrack(@Param('id') id: string) {
    return await this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id') id: string): Promise<void> {
    await this.favsService.removeTrack(id);
  }

  @Post('/album/:id')
  @Header('Content-Type', 'application/json')
  async addAlbum(@Param('id') id: string) {
    return await this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id') id: string): Promise<void> {
    await this.favsService.removeAlbum(id);
  }

  @Post('/artist/:id')
  @Header('Content-Type', 'application/json')
  async addArtist(@Param('id') id: string) {
    return await this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id') id: string): Promise<void> {
    await this.favsService.removeArtist(id);
  }
}
