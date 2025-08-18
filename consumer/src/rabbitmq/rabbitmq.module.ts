import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { SettingsModule } from '../settings/settings.module';
import { XRayModule } from '../x-ray/x-ray.module';

@Module({
  imports: [SettingsModule, XRayModule],
  providers: [RabbitmqService],
})
export class RabbitmqModule {}
