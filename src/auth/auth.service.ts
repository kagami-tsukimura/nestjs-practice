import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from './user-status.enum';
import { UserRepositry } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepositry) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const found = await this.userRepository.findOne(id);
    return found
      ? found
      : (() => {
          throw new NotFoundException();
        })();
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async updateStatus(id: string): Promise<User> {
    const user = await this.findById(id);
    user.status = UserStatus.PREMIUM;
    await this.userRepository.save(user);
    return user;
  }
}
