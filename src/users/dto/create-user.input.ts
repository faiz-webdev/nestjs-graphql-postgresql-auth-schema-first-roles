import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Matches, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

  @MinLength(4)
  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @IsAlpha()
  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'role of the user' })
  @IsOptional()
  role: string;

  @Field(() => String)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Paswword is too weak',
  // })//allowed password: Test@123, plain password(123456) not allowed
  password: string;
}
