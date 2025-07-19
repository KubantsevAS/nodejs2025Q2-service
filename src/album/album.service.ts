import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { Album } from '@prisma/client';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService extends AppService<Album> {
  constructor(
    private readonly trackService: TrackService,
    private eventEmitter: EventEmitter2,
  ) {
    super();
  }

  protected getModelName(): string {
    return 'album';
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await super.create(createAlbumDto as Album);
  }

  async findAll(): Promise<Album[]> {
    return await super.findAll();
  }

  async findOne(id: string): Promise<Album> {
    return await super.findById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return await super.update(id, updateAlbumDto as Omit<Album, 'id'>);
  }

  async remove(id: string): Promise<void> {
    const tracks = await this.trackService.findAll();

    const albumTracks = tracks.filter((track) => track.albumId === id);

    albumTracks.forEach((track) => {
      this.trackService.update(track.id, { ...track, albumId: null });
    });

    await super.remove(id);
    this.eventEmitter.emit('album.deleted', id);
  }
}
