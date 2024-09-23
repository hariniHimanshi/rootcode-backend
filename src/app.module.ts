import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';

dotenv.config();
const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DATABASE_HOST,
      port: parseInt(DATABASE_PORT),
      username: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
      autoLoadEntities: true,
      timezone: '+05:30',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
