import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService extends AppService<Track> {
  create(createTrackDto: CreateTrackDto): Track {
    return super.create(createTrackDto as Track);
  }

  findAll(): Track[] {
    return super.findAll();
  }

  findOne(id: string): Track {
    return super.findById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    return super.update(id, updateTrackDto);
  }

  remove(id: string): void {
    super.remove(id);
  }
}
