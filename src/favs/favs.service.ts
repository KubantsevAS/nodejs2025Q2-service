import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { validate as isUuid } from 'uuid';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FavsService {
  private prisma: PrismaClient;

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {
    this.prisma = new PrismaClient();
  }

  @OnEvent('artist.deleted')
  async handleArtistDeleted(id: string) {
    await this.removeFromFavs('artist', id, true);
  }

  @OnEvent('album.deleted')
  async handleAlbumDeleted(id: string) {
    await this.removeFromFavs('album', id, true);
  }

  @OnEvent('track.deleted')
  async handleTrackDeleted(id: string) {
    await this.removeFromFavs('track', id, true);
  }

  async findAllFavs() {
    const fav = await this.prisma.fav.findFirst({
      include: {
        artists: { include: { artist: true } },
        albums: { include: { album: true } },
        tracks: { include: { track: true } },
      },
    });

    if (!fav) {
      return { artists: [], albums: [], tracks: [] };
    }

    return {
      artists: fav.artists.map(favorite => favorite.artist),
      albums: fav.albums.map(favorite => favorite.album),
      tracks: fav.tracks.map(favorite => favorite.track),
    };
  }

  async addTrack(id: string) {
    return await this.addToFavs('track', id);
  }

  async removeTrack(id: string): Promise<void> {
    return this.removeFromFavs('track', id);
  }

  async addAlbum(id: string) {
    return this.addToFavs('album', id);
  }

  async removeAlbum(id: string): Promise<void> {
    return this.removeFromFavs('album', id);
  }

  async addArtist(id: string) {
    return this.addToFavs('artist', id);
  }

  async removeArtist(id: string): Promise<void> {
    return this.removeFromFavs('artist', id);
  }

  private async addToFavs(type: 'artist' | 'album' | 'track', id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Record Id is invalid (not uuid)');
    }

    try {
      let fav = await this.prisma.fav.findFirst();

      if (!fav) {
        fav = await this.prisma.fav.create({ data: {} });
      }

      const service = this.getService(type);
      await service.findOne(id);

      const relationMap = {
        artist: { favId: fav.id, artistId: id },
        album: { favId: fav.id, albumId: id },
        track: { favId: fav.id, trackId: id },
      };

      await this.prisma[`favTo${type.charAt(0).toUpperCase() + type.slice(1)}`].create({
        data: relationMap[type],
      });

      return service.findOne(id);
    } catch {
      throw new UnprocessableEntityException("Record with id doesn't exist");
    }
  }

  private async removeFromFavs(
    type: 'artist' | 'album' | 'track',
    id: string,
    silentMode: boolean = false,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Record Id is invalid (not uuid)');
    }

    const fav = await this.prisma.fav.findFirst({
      include: {
        [type + 's']: true
      }
    });

    if (!fav) {
      throw new NotFoundException('Record was not found');
    }

    const relationName = `favTo${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const relation = await this.prisma[relationName].findFirst({
      where: {
        [`${type}Id`]: id,
        favId: fav.id
      }
    });

    if (!relation && !silentMode) {
      throw new NotFoundException('Record was not found');
    }

    await this.prisma[relationName].delete({
      where: {
        [`favId_${type}Id`]: {
          favId: fav.id,
          [`${type}Id`]: id
        }
      }
    });
  }

  private getService(type: 'artist' | 'album' | 'track') {
    const serviceMap = {
      artist: this.artistService,
      album: this.albumService,
      track: this.trackService,
    };

    return serviceMap[type];
  }
}
