import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'title of the post' })
  title: string;

  @Field(() => String, { description: 'description of the desc' })
  body: string;
}
