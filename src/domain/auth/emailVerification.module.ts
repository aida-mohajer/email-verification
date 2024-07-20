import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerificationController } from './emailVerification.controller';
import { User } from 'src/entities/user.entity';
import { EmailVerificationService } from './emailVerification.service';
import { EmailVerificationRepository } from './emailVerification.repository';
import { AuthProfile } from './user.profile';
import { EventService } from './event-emitter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, EmailVerificationRepository]),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [EmailVerificationController],
  exports: [EmailVerificationService],
  providers: [
    EmailVerificationService,
    EmailVerificationRepository,
    AuthProfile,
    EventService,
  ],
})
export class UserModule {}
