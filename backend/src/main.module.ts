import { Module } from '@nestjs/common';
import { AppService } from 'src/Service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalModule } from 'src/Module/global.module'
import { AppController } from 'src/Controller/app.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: ['dist/entities/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    GlobalModule,
    MulterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class MainModule {}
