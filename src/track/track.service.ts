import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { AppService } from '../app.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService extends AppService<Track> {
  constructor() {
    super();
  }

  protected getModelName(): string {
    return 'track';
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await super.create(createTrackDto as Track);
  }

  async findAll(): Promise<Track[]> {
    return super.findAll();
  }

  async findOne(id: string): Promise<Track> {
    return await super.findById(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    return await super.update(id, updateTrackDto as Omit<Track, 'id'>);
  }

  async remove(id: string): Promise<void> {
    await super.remove(id);
  }
}
