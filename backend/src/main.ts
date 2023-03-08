import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

// buat baca folder restomenuphotos
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  // untuk membaca folder restomenuphotos di FE 
  // TOLONG JANGAN DI HAPUSSS LINE 14 INIIII, DIPAKE SAMA MODUL RESTO - SOFFIE ANASTYA
  app.use('/restomenuphotos', express.static(path.join(__dirname,'../restomenuphotos')));
  const port = 3600;
  await app.listen(port, () => {
    console.log(`server anda berjalan pada port ${port}`);
  });
}
bootstrap();
