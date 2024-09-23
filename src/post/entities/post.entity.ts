import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
@Entity()
export class Post{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) 
  title: string; 

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  color: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
