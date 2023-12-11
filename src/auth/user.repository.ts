import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepositry extends Repository<User> {
  async createUser(CreateUserDto): Promise<User> {
    const { username, password, status } = CreateUserDto;
    const user = this.create({ username, password, status });

    await this.save(user);
    return user;
  }
}
