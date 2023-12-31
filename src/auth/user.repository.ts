import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepositry extends Repository<User> {
  async createUser(CreateUserDto): Promise<User> {
    const { username, password, status } = CreateUserDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashPassword, status });

    await this.save(user);
    return user;
  }
}
