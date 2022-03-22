import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { OneToMany } from 'typeorm';
import { Comment } from 'src/comments/entity/comment.entity';

@ObjectType()
export class UserResponseModel {
  @Field(() => String, { description: 'id of the user' })
  userId: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'role of the user' })
  role: string;

  @OneToMany((_type) => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  posts: Post[];

  @OneToMany((_type) => Comment, (comment) => comment.user)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
