import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvConfig, ISettingData } from './interfaces';

@Injectable()
export class SettingsService {
  private readonly configData: ISettingData;

  constructor(private readonly config: ConfigService<IEnvConfig>) {
    this.configData = this.parseConfig();
  }

  getConfig(): ISettingData {
    return this.configData;
  }

  private parseConfig(): ISettingData {
    return {
      rabbitmq: {
        hostname: this.config.get<string>('RABBITMQ_HOST'),
        username: this.config.get<string>('RABBITMQ_DEFAULT_USER'),
        password: this.config.get<string>('RABBITMQ_DEFAULT_PASS'),
        exchange: this.config.get<string>('RABBITMQ_EXCHANGE'),
        signalRoutingKey: this.config.get<string>(
          'RABBITMQ_ROUTING_KEY_SIGNAL',
        ),
      },
    } as ISettingData;
  }
}
