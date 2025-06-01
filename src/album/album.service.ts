import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Album[];

  constructor() {
    this.albums = [];
  }

  create({ name, year, artistId }: AlbumDto) {
    const album = {
      id: uuidV4(),
      name,
      year,
      artistId,
    };

    this.albums.push(album);

    return album;
  }

  findAll() {
    return this.albums ?? [];
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    return album;
  }

  update(id: string, updateAlbumDto: AlbumDto) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    for (const key in updateAlbumDto) {
      album[key] = updateAlbumDto[key];
    }

    return album;
  }

  remove(id: string) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    this.albums.splice(this.albums.indexOf(album), 1);
  }
}
