import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  body: string;

  @Field(() => String)
  @IsUUID()
  postId: string;

  //   @Field(() => String)
  //   @IsOptional()
  //   commentId: string;
}
