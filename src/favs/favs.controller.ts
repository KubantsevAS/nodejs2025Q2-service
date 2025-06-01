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
  findAllFavs() {
    return this.favsService.findAllFavs();
  }

  @Post('/track/:id')
  @Header('Content-Type', 'application/json')
  addTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.favsService.removeTrack(id);
  }

  @Post('/album/:id')
  @Header('Content-Type', 'application/json')
  addAlbum(@Param('id') id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('/artist/:id')
  @Header('Content-Type', 'application/json')
  addArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favsService.removeArtist(id);
  }
}
