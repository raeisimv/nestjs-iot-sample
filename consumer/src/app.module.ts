import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsService } from './settings/settings.service';
import { SettingsModule } from './settings/settings.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { AppController } from './app.controller';
import { XRayModule } from './x-ray/x-ray.module';
import { AppService } from './app.service';

@Module({
  imports: [
    SettingsModule,
    RabbitmqModule,
    XRayModule,
    MongooseModule.forRootAsync({
      useFactory: (settingsService: SettingsService) => {
        return {
          uri: settingsService.getConfig().mongodbURI,
        };
      },
      imports: [SettingsModule],
      inject: [SettingsService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
