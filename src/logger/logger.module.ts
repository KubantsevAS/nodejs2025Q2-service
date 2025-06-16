import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [
    {
      provide: 'LOGGER_CONTEXT',
      useValue: 'Application',
    },
    LoggerService,
  ],
  exports: [LoggerService, 'LOGGER_CONTEXT'],
})
export class LoggerModule {}
