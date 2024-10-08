import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  postId: number;
}