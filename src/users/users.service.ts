import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseModel } from './user-response.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserResponseModel> {
    const findUser = await this.userRepository.findOne({
      email: createUserInput.email,
    });
    if (findUser) {
      throw new BadRequestException(`User already exists`);
      // throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const saltOrRounds = 10;
    const password = createUserInput.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = this.userRepository.create({
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      email: createUserInput.email,
      role: createUserInput.role,
      exampleField: createUserInput.exampleField,
      // password: hashedPassword,
      password,
    });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<Array<User>> {
    const user = this.userRepository.find({ relations: ['comments', 'posts'] });
    console.log('userService=>findAll=>user: ', user);
    // return await this.userRepository.find({ relations: ['posts', 'comments'] });
    return user;
  }

  async findOne(userId: string): Promise<UserResponseModel> {
    // console.log('userService=>findOne=>userId: ', userId);
    const user = await this.userRepository.findOne(userId, {
      relations: ['posts', 'comments'],
    });
    console.log('userService=>findOne=>user: ', user);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async update(
    userId: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserResponseModel> {
    const user = await this.userRepository.preload({
      userId: userId,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<UserResponseModel> {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return user;
  }

  // async remove(userId: string): Promise<UserResponseModel> {
  //   const user = await this.findOne(userId);
  //   await this.userRepository.remove(user);

  //   return {
  //     userId: userId,
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     role: '',
  //     exampleField: 0,
  //   };
  // }

  async remove(userId: string): Promise<UserResponseModel> {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    await this.userRepository.delete(user);

    return {
      userId: userId,
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      exampleField: 0,
      posts: [],
      comments: [],
    };
  }

  private _sanitizeUser(user: User) {
    delete user.password;
    return user;
  }

  // async userPosts(user: User): Promise<UserResponseModel> {
  //   const userDetail = await this.findUserByEmail(user.email);
  //   return userDetail;
  //   // return await this.userRepository.find({
  //   //   relations: ['posts'],
  //   // });
  // }
}
