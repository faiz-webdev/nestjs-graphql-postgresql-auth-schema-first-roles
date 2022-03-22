import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { CommentsModule } from './comments/comments.module';
dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot({
      // autoSchemaFile: './schema.gql',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts, .js}'],
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
