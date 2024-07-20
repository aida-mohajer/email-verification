import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty()
  @AutoMap()
  @Column()
  email: string;

  // @ApiProperty()
  @AutoMap()
  @Column()
  code: number;

  // @ApiProperty()
  @AutoMap()
  @Column()
  createdAt: Date;
}
