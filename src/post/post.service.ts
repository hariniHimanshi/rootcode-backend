import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  create(postData: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  // findAllPosts(): Promise<Post[]> {
  //   return this.postsRepository.find({ relations: ['comments'] });
  // }

  async findAllPosts(): Promise<any[]> {
    const posts = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comment')
      .loadRelationCountAndMap('post.commentCount', 'post.comments') // This will map the comment count
      .getMany();

    return posts.map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      color: post.color,
      commentCount: post['commentCount'], // Accessing the mapped comment count
      comments: post.comments,
    }));
  }
  findPostById(id: number): Promise<Post> {
    const post = this.postsRepository.findOne({ where: { id }, relations: ['comments'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async createComment(commentData: CreateCommentDto): Promise<Comment> {
    const post = await this.postsRepository.findOne({ where: { id: commentData.postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${commentData.postId} not found`);
    }
    const comment = this.commentsRepository.create({ ...commentData, post });
    return this.commentsRepository.save(comment);
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
