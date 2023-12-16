import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { UserStatus } from './user-status.enum';
import { UserRepositry } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepositry,
    private jwtService: JwtService,
  ) {}

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

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException(
      '認証に失敗しました。ユーザー名またはパスワードを確認してください。',
    );
  }
}
