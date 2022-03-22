import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthGuard } from './auth.guard';
import { AuthResponse } from './dto/auth-response.type';

@Resolver('User')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args('email') email: string) {
    return await this.authService.login(email);
  }

  @Query(() => User)
  @UseGuards(new AuthGuard())
  me(@Context('user') user: User) {
    return this.authService.getUserProfile(user.email);
  }

  @Mutation(() => AuthResponse)
  async singIn(@Args('authInput') authInput: AuthInput) {
    return await this.authService.signIn(authInput);
  }

  // @Query(() => User)
  // @UseGuards(new AuthGuard())
  // getUserProfile() {

  // }
}
