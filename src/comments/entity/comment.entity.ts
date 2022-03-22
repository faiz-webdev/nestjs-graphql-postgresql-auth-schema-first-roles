import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  commentId: string;

  @Column()
  @Field(() => String)
  body: string;

  @Column()
  @Field()
  postId: string;

  @ManyToOne((_type) => Post, (post) => post.comments, {
    eager: true,
  })
  @Field(() => Post)
  post: Post;

  @Column()
  @Field(() => String)
  userId: string;

  //   @ManyToOne((type) => User, (user) => user.comments)
  //   @Field(() => User)
  //   user: User;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((_type) => User, (user) => user.comments, {
    eager: true,
  })
  //   @Field((_type) => User)
  user: User;
}
