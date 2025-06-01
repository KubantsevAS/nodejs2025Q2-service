import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
