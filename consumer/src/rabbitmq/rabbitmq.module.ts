import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [SettingsModule],
  providers: [RabbitmqService],
})
export class RabbitmqModule {}
