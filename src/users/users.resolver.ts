import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserResponseModel } from './user-response.model';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/entities/post.entity';
import { Roles } from './roles.decorator';
import { Role } from './entities/role.enum';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postService: PostsService,
  ) {}

  @Mutation(() => UserResponseModel)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserResponseModel], { name: 'users' })
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserResponseModel, { name: 'singleUser' })
  getUserById() {
    return 'dsd';
  }

  @Query(() => UserResponseModel, { name: 'user' })
  findOne(@Args('userId', { type: () => String }) userId: string) {
    return this.usersService.findOne(userId);
  }

  @Mutation(() => UserResponseModel)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.userId, updateUserInput);
  }

  @Mutation(() => UserResponseModel)
  removeUser(@Args('userId', { type: () => String }) userId: string) {
    return this.usersService.remove(userId);
  }

  // @Query(() => UserResponseModel)
  // @UseGuards(new AuthGuard())
  // userPosts(@Context('user') user: User) {
  //   return this.usersService.userPosts(user);
  // }

  // @ResolveField('posts', () => [Post])
  // async posts(@Parent() user: User) {
  //   const { userId } = user;
  //   console.log('user: ', user);
  //   return this.postService.findByCustomer(userId);
  // }
}
