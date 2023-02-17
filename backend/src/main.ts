import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  const port = 3501;
  await app.listen(port, () => {
    console.log(`server anda berjalan pada port ${port}`);
  });
}
bootstrap();
