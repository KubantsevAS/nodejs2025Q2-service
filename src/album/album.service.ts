import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService extends AppService<Album> {
  constructor(private readonly trackService: TrackService) {
    super();
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    return super.create(createAlbumDto as Album);
  }

  findAll(): Album[] {
    return super.findAll();
  }

  findOne(id: string): Album {
    return super.findById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    return super.update(id, updateAlbumDto as Omit<Album, 'id'>);
  }

  remove(id: string): void {
    const tracks = this.trackService
      .findAll()
      .filter((track) => track.albumId === id);

    tracks.forEach((track) => {
      this.trackService.update(track.id, { ...track, albumId: null });
    });

    super.remove(id);
  }
}
