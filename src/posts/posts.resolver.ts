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
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { User } from '../users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/entities/role.enum';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostsService) {}

  // @Mutation(() => Post, { name: 'addNewPost' })
  // addNewPost(@Args('createPostInput') createPostInput: CreatePostInput) {
  //   return this.postService.addNewPost(createPostInput);
  // }
  @Mutation(() => Post, { name: 'addNewPost' })
  @UseGuards(new AuthGuard())
  addNewPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context('user') user: User,
  ) {
    return this.postService.addNewPost(createPostInput, user);
  }

  @Query(() => [Post], { name: 'posts' })
  @Roles(Role.ADMIN)
  getAllPost() {
    return this.postService.getAllPost();
  }

  @Query(() => Post, { name: 'post' })
  post(@Args('postId', { type: () => String }) postId: string) {
    return this.postService.getPost(postId);
  }

  @Mutation(() => Post, { name: 'updatePost' })
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.updatePost(updatePostInput.postId, updatePostInput);
  }

  @ResolveField(() => User)
  user(@Root() user: User) {
    console.log('postResolver=> user: ', user);
    return this.postService.getUser(user.userId);
  }

  // @ResolveField(() => User)
  // comment(@Root() user: User) {
  //   console.log('postResolver=> user: ', user);
  //   return this.postService.getUser(user.userId);
  // }
}
