import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmailVerificationService } from './emailVerification.service';
import { VerificationUserDto } from './dto/verificationUser';
import { VerificationResDto } from './dto/verificationRes.dto';
import { VerificationEmailDto } from './dto/verificationEmail.dto';
import { SendCodeDto } from './dto/sendcode.dto';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Post('send-code')
  sendCode(@Body() data: VerificationEmailDto): Promise<SendCodeDto> {
    return this.emailVerificationService.sendCode(data);
  }

  @Post('verify-code')
  verifyCode(@Body() data: VerificationUserDto): Promise<VerificationResDto> {
    return this.emailVerificationService.verifyCode(data);
  }
}
