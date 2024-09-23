import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
