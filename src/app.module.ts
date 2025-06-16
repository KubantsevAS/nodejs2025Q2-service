import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { UserModule } from './user/user.module';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { LoggerModule } from './logger/logger.module';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    UserModule,
    AuthModule,
    LoggerModule,
    FiltersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [PrismaClient],
})
export class AppModule {}
