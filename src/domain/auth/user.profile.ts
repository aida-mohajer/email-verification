import { AutomapperProfile } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { User } from '../../entities/user.entity';
import { VerificationEmailDto } from './dto/verificationEmail.dto';
import { SendCodeDto } from './dto/sendcode.dto';

@Injectable()
export class AuthProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, SendCodeDto, User);
      createMap(mapper, User, SendCodeDto);
      createMap(mapper, VerificationEmailDto, User);
    };
  }
}
