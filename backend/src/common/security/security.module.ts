import { Global, Module } from '@nestjs/common';
import { HCaptchaService } from './hcaptcha.service';

@Global()
@Module({
  providers: [HCaptchaService],
  exports: [HCaptchaService],
})
export class SecurityModule {}
