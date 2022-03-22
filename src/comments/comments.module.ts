import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { CommentResolver } from './comments.resolver';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => UsersModule),
    forwardRef(() => PostsModule),
  ],
  providers: [CommentResolver, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
