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
  getRabbitMQConn() {
    return {
      hostname: this.configData.rabbitmq.hostname,
      username: this.configData.rabbitmq.username,
      password: this.configData.rabbitmq.password,
    };
  }

  private parseConfig(): ISettingData {
    return {
      rabbitmq: {
        hostname: this.config.get<string>('RABBITMQ_HOST'),
        username: this.config.get<string>('RABBITMQ_DEFAULT_USER'),
        password: this.config.get<string>('RABBITMQ_DEFAULT_PASS'),
        exchange: this.config.get<string>('RABBITMQ_EXCHANGE'),
        signalRoutingKey: this.config.get('RABBITMQ_ROUTING_KEY_SIGNAL'),
      },
      mongodbURI: this.config.get<string>('MONGO_URI'),
      port: +(this.config.get<number>('APP_PORT') || 3000),
      isSwaggerEnabled: this.config.get('ENABLE_SWAGGER') === 'true',
      allowedOrigins: this.config.get<string>('ALLOWED_ORIGINS'),
    } as ISettingData;
  }

  isProduction() {
    return this.config.get('NODE_ENV') === 'production';
  }

  getCors() {
    return {
      origin: this.configData.allowedOrigins,
    };
  }
}
