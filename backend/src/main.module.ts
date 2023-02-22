import { Module } from '@nestjs/common';
import { AppService } from './service/app.service';
import { AppController } from './Controller/app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GlobalModule } from './Module/global.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      autoLoadEntities: false,
      synchronize: false,
    }),
    GlobalModule,
    // to add pict from resto menu photo or others
    MulterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class MainModule {}
