import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidV4 } from 'uuid';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const track = {
      id: uuidV4(),
      name,
      artistId,
      albumId,
      duration,
    };

    this.tracks.push(track);

    return track;
  }

  findAll() {
    return this.tracks || [];
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    for (const key in updateTrackDto) {
      track[key] = updateTrackDto[key];
    }

    return track;
  }

  remove(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    this.tracks.splice(this.tracks.indexOf(track), 1);
  }
}
