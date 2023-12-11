import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepositry } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepositry])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
