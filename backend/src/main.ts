import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

// buat baca folder restomenuphotos
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  const port = 3600;
  await app.listen(port, () => {
    console.log(`server anda berjalan pada port ${port}`);
  });
}
bootstrap();
