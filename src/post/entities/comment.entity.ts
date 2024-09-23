import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  description: string;


  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
