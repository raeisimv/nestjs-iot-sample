export interface IEnvConfig {
  RABBITMQ_DEFAULT_USER: string;
  RABBITMQ_DEFAULT_PASS: string;
  RABBITMQ_HOST: string;
  RABBITMQ_EXCHANGE: string;
  RABBITMQ_ROUTING_KEY_SIGNAL: string;

  MONGO_URI: string;
  NODE_PORT: number;
  ENABLE_SWAGGER: string;
}
