import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UserResponseModel } from '../users/user-response.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UsersService,
  ) {}

  async addNewPost(
    createPostInput: CreatePostInput,
    user: User,
  ): Promise<Post> {
    const findUser = await this.userService.findUserByEmail(user.email);
    const post = await this.postRepository.create({
      ...createPostInput,
      user: findUser,
      userId: findUser.userId,
    });

    return await this.postRepository.save(post);
  }

  async getAllPost(): Promise<Array<Post>> {
    return await this.postRepository.find({ relations: ['comments'] });
  }

  async getPost(postId: string): Promise<Post> {
    return await this.postRepository.findOne(postId, {
      relations: ['comments'],
    });
  }

  async updatePost(
    postId: string,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    let post = await this.postRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException(`User #${updatePostInput.postId} not found`);
    }
    post = await this.postRepository.preload({
      postId: postId,
      ...updatePostInput,
    });

    console.log('post: ', post);

    return this.postRepository.save(post);
  }

  // findByCustomer(userId: string): Promise<Post[]> {
  //   return this.postRepository
  //     .createQueryBuilder('post')
  //     .where('post.user = :userId', { userId })
  //     .getMany();
  // }

  async getUser(userId: string): Promise<UserResponseModel> {
    return await this.userService.findOne(userId);
  }
}
