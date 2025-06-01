import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Artist[];

  constructor() {
    this.artists = [];
  }

  create({ name, grammy }: ArtistDto) {
    const artist = {
      id: uuidV4(),
      name,
      grammy,
    };

    this.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.artists ?? [];
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    return artist;
  }

  update(id: string, updateArtistDto: ArtistDto) {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    for (const key in updateArtistDto) {
      artist[key] = updateArtistDto[key];
    }

    return artist;
  }

  remove(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    this.artists.splice(this.artists.indexOf(artist), 1);
  }
}
