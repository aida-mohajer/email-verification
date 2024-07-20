import { Module } from '@nestjs/common';
import { UserModule } from './auth/emailVerification.module';

@Module({
  imports: [UserModule],
})
export class DomainModule {}
