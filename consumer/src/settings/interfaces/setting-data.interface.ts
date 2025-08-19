import { IRabbitmqConfig } from './rabbitmq-config.interface';

export interface ISettingData {
  rabbitmq: IRabbitmqConfig;
  port: number;
  mongodbURI: string;
  isSwaggerEnabled: boolean;
}
