import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepositry } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepositry) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }
}
