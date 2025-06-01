import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService extends AppService<Album> {
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
    super.remove(id);
  }
}
