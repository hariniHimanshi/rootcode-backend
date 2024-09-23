import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])], // Import TypeOrmModule with Post and Comment entities for database operations
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
