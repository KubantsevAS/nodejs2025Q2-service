import { IsNotEmpty, IsBoolean } from 'class-validator';

export class ArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
