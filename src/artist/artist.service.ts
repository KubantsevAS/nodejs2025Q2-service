import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService extends AppService<Artist> {
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
    super.remove(id);
  }
}
