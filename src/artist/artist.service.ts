import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService extends AppService<Artist> {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {
    super();
  }

  create(createArtistDto: CreateArtistDto): Artist {
    return super.create(createArtistDto as Artist);
  }

  findAll(): Artist[] {
    return super.findAll();
  }

  findOne(id: string): Artist {
    return super.findById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    return super.update(id, updateArtistDto as Omit<Artist, 'id'>);
  }

  remove(id: string): void {
    this.setReferenceNull(this.trackService, id);
    this.setReferenceNull(this.albumService, id);

    super.remove(id);
  }

  private setReferenceNull(service: TrackService | AlbumService, id: string) {
    const entities = service
      .findAll()
      .filter((entity) => entity.artistId === id);

    entities.forEach((entity) => {
      if ('duration' in entity) {
        this.trackService.update(entity.id, { ...entity, artistId: null });
      } else {
        this.albumService.update(entity.id, { ...entity, artistId: null });
      }
    });
  }
}
