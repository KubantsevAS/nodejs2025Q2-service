import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController<T extends { id: string }> {
  constructor(private readonly appService: AppService<T>) {}
}
