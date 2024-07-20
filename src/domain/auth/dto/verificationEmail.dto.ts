import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerificationEmailDto {
  @AutoMap()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
