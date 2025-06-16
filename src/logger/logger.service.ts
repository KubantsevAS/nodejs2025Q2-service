import {
  Injectable,
  LoggerService as NestLoggerService,
  Inject,
  Optional,
} from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private context?: string;

  constructor(@Optional() @Inject('LOGGER_CONTEXT') context?: string) {
    this.context = context;
  }

  log(message: string, metadata?: Record<string, any>): void {
    this.printMessage('LOG', message, metadata);
  }

  error(message: string, metadata?: Record<string, any>): void {
    this.printMessage('ERROR', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.printMessage('WARN', message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.printMessage('DEBUG', message, metadata);
  }

  verbose(message: string, metadata?: Record<string, any>): void {
    this.printMessage('VERBOSE', message, metadata);
  }

  private printMessage(
    level: string,
    message: string,
    metadata?: Record<string, any>,
  ): void {
    const timestamp = new Date().toISOString();
    const contextStr = this.context || 'Application';
    const metadataStr = metadata ? ` ${JSON.stringify(metadata)}` : '';
    console.log(
      `[${timestamp}] [${level}] [${contextStr}] ${message}${metadataStr}`,
    );
  }
}
