import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../user-status.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(8)
  password: number;

  @IsEnum(UserStatus)
  status: UserStatus;
}
