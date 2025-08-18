import { IRabbitmqConfig } from './rabbitmq-config.interface';

export interface ISettingData {
  rabbitmq: IRabbitmqConfig;
  mongodbURI: string;
}
