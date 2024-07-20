import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SendCodeDto {
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  code: number;
}
