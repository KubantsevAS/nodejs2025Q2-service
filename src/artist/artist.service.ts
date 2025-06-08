import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppService } from '../app.service';
import { PrismaClient, Artist } from '@prisma/client';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService extends AppService<Artist> {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private eventEmitter: EventEmitter2,
  ) {
    super();
  }

  protected getModelName(): string {
    return 'artist';
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await super.create(createArtistDto as Artist);
  }

  async findAll(): Promise<Artist[]> {
    return await super.findAll();
  }

  async findOne(id: string): Promise<Artist> {
    return await super.findById(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return await super.update(id, updateArtistDto as Omit<Artist, 'id'>);
  }

  async remove(id: string): Promise<void> {
    this.setReferenceNull(this.trackService, id);
    this.setReferenceNull(this.albumService, id);
    await super.remove(id);
    this.eventEmitter.emit('artist.deleted', id);
  }

  private async setReferenceNull(service: TrackService | AlbumService, id: string) {
    const entities = await service.findAll()

    const artistEntities = entities.filter((entity) => entity.artistId === id);

    artistEntities.forEach((entity) => {
      if ('duration' in entity) {
        this.trackService.update(entity.id, { ...entity, artistId: null });
      } else {
        this.albumService.update(entity.id, { ...entity, artistId: null });
      }
    });
  }
}
