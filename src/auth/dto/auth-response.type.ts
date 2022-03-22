import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => String, { description: 'first name of the user' })
  token: string;

  @Field(() => String, { description: 'first name of the user' })
  message: string;

  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User first name' })
  firstName: string;

  @Field(() => String, { description: 'User last name' })
  lastName: string;

  // @Field(() => User)
  // user: User;
}
