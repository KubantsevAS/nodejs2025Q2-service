import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Fav } from './entities/fav.entity';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { validate as isUuid } from 'uuid';

@Injectable()
export class FavsService {
  protected favs: Fav = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @OnEvent('artist.deleted')
  handleArtistDeleted(id: string) {
    this.removeFromFavs(this.favs.artists, id, true);
  }

  @OnEvent('album.deleted')
  handleAlbumDeleted(id: string) {
    this.removeFromFavs(this.favs.albums, id, true);
  }

  @OnEvent('track.deleted')
  handleTrackDeleted(id: string) {
    this.removeFromFavs(this.favs.tracks, id, true);
  }

  findAllFavs() {
    const artists = this.getRecords(this.favs.artists, this.artistService);
    const albums = this.getRecords(this.favs.albums, this.albumService);
    const tracks = this.getRecords(this.favs.tracks, this.trackService);

    return { artists, albums, tracks };
  }

  addTrack(id: string) {
    return this.addToFavs(this.favs.tracks, this.trackService, id);
  }

  removeTrack(id: string) {
    this.removeFromFavs(this.favs.tracks, id);
  }

  addAlbum(id: string) {
    return this.addToFavs(this.favs.albums, this.albumService, id);
  }

  removeAlbum(id: string) {
    this.removeFromFavs(this.favs.albums, id);
  }

  addArtist(id: string) {
    return this.addToFavs(this.favs.artists, this.artistService, id);
  }

  removeArtist(id: string) {
    this.removeFromFavs(this.favs.artists, id);
  }

  private getRecords(
    entitiesArray: string[],
    service: ArtistService | AlbumService | TrackService,
  ) {
    return entitiesArray.map((entityId) => service.findOne(entityId));
  }

  private addToFavs(
    entitiesArray: string[],
    service: ArtistService | AlbumService | TrackService,
    id: string,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Record Id is invalid (not uuid)');
    }

    try {
      const [entity] = this.getRecords([id], service);

      if (!entitiesArray.includes(id)) {
        entitiesArray.push(id);
      }

      return entity;
    } catch {
      throw new UnprocessableEntityException("Record with id doesn't exist");
    }
  }

  private removeFromFavs(
    entitiesArray: string[],
    id: string,
    silentMode: boolean = false,
  ): void {
    if (!isUuid(id)) {
      throw new BadRequestException('Record Id is invalid (not uuid)');
    }

    const entityIdx = entitiesArray.indexOf(id);

    if (entityIdx === -1 && !silentMode) {
      throw new NotFoundException('Record was not found');
    }

    entitiesArray.splice(entityIdx, 1);
  }
}
