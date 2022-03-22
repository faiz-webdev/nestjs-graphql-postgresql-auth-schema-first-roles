import { InputType, PartialType, Field } from '@nestjs/graphql';
import { CreateCommentInput } from './create-comment.input';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => String)
  postId: string;
}
