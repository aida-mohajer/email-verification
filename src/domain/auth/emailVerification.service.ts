import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EmailVerificationRepository } from './emailVerification.repository';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { VerificationEmailDto } from './dto/verificationEmail.dto';
import { EventService } from './event-emitter';
import { SendCodeDto } from './dto/sendcode.dto';
import { VerificationUserDto } from './dto/verificationUser';
import { VerificationResDto } from './dto/verificationRes.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailVerificationService extends TypeOrmCrudService<User> {
  constructor(
    private readonly repository: EmailVerificationRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly eventService: EventService,
    private readonly jwtService: JwtService,
  ) {
    super(repository);
  }

  async sendCode(data: VerificationEmailDto): Promise<SendCodeDto> {
    const existUser = await this.repository.findOne({
      where: { email: data.email },
    });
    if (existUser) {
      return this.mapper.map(existUser, User, SendCodeDto);
    }

    const user = this.mapper.map(data, VerificationEmailDto, User);
    const userData = await this.eventService.handlePreSaveOperation(user);
    console.log(userData);
    const result = await this.repository.save(userData);
    return this.mapper.map(result, User, SendCodeDto);
  }

  async verifyCode({
    email,
    code,
  }: VerificationUserDto): Promise<VerificationResDto> {
    const user = await this.repository.findOne({ where: { email, code } });

    const dto = new VerificationResDto();
    if (user) {
      dto.success = true;

      const payload = { sub: user.id };
      const token = await this.jwtService.signAsync(payload);
      dto.accessToken = token;
      // await this.userRepository.remove(existingUser);

      return dto;
    } else {
      dto.success = false;
      return dto;
    }
  }
}
