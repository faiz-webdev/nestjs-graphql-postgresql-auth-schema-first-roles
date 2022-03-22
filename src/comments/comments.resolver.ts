import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Root,
} from '@nestjs/graphql';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entity/comment.entity';
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentsService) {}

  @Mutation(() => Comment, { name: 'addNewComment' })
  @UseGuards(new AuthGuard())
  addNewComment(
    @Args('createPostInput') createCommentInput: CreateCommentInput,
    @Context('user') user: User,
  ) {
    return this.commentService.addNewComment(createCommentInput, user);
  }

  @Query(() => [Comment], { name: 'comments' })
  allComment() {
    return this.commentService.allComment();
  }

  @ResolveField(() => Post)
  post(@Root() post: Post) {
    console.log('comemntResolver=>post: ', post);
    return this.commentService.getPost(post.postId);
  }

  @ResolveField(() => User)
  user(@Root() user: User) {
    console.log('comemntResolver=>user: ', user);
    return this.commentService.getUser(user.userId);
  }
}
