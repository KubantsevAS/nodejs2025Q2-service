import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import * as YAML from 'yaml';
import * as path from 'path';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  const apiYamlPath = path.join(__dirname, '..', 'doc', 'api.yaml');
  const fileContents = await fs.readFile(apiYamlPath, 'utf8');
  const swaggerDocument = YAML.parse(fileContents);

  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(PORT);
}
bootstrap();
