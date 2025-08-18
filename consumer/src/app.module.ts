import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SettingsModule } from './settings/settings.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { XRayModule } from './x-ray/x-ray.module';

@Module({
  imports: [SettingsModule, RabbitmqModule, XRayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
