import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEmail, IsNotEmpty } from 'class-validator';

export class VerificationUserDto {
  // @AutoMap()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @AutoMap()
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
