import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Post } from '../posts/entities/post.entity';
import { PostsService } from '../posts/posts.service';
import { UserResponseModel } from '../users/user-response.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UsersService,
    private readonly postService: PostsService,
  ) {}

  async addNewComment(
    createCommentInput: CreateCommentInput,
    user: User,
  ): Promise<Comment> {
    const findUser = await this.userService.findUserByEmail(user.email);
    const comment = this.commentRepository.create({
      ...createCommentInput,
      userId: findUser.userId,
      post: createCommentInput,
    });
    return await this.commentRepository.save(comment);
  }

  async allComment() {
    return await this.commentRepository.find();
  }

  async getPost(postId: string): Promise<Post> {
    return await this.postService.getPost(postId);
  }

  async getUser(userId: string): Promise<UserResponseModel> {
    return await this.userService.findOne(userId);
  }
}
