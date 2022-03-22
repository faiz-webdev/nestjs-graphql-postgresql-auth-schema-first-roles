import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Comment } from 'src/comments/entity/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the user' })
  postId: string;

  @Column()
  @Field(() => String, { description: 'first name of the user' })
  title: string;

  @Column()
  @Field(() => String, { description: 'last name of the user' })
  body: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Field()
  userId: string;

  @ManyToOne((_type) => User, (user) => user.posts, {
    eager: true,
  })
  @Field((_type) => User)
  user: User;

  @OneToMany((_type) => Comment, (comment) => comment.post, {})
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
