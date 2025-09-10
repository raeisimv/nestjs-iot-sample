import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel, ConsumeMessage } from 'amqplib';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { XRayInboundService } from '../x-ray/x-ray-inbound.service';
import { SettingsService } from '../settings/settings.service';
import { IXRayRawSignal } from '../x-ray/interfaces';
import { QUEUE_NAME } from './constants';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private readonly logger = new Logger(RabbitmqService.name);
  private channel: ChannelWrapper;

  constructor(
    private readonly settingService: SettingsService,
    private readonly xrayInboundService: XRayInboundService,
  ) {}

  async onModuleInit() {
    const conn = amqp.connect(this.settingService.getRabbitMQConn());
    this.channel = conn.createChannel();
    await this.channel.addSetup(async (channel: ConfirmChannel) => {
      await channel.assertExchange(
        this.settingService.getConfig().rabbitmq.exchange,
        'topic',
        {
          durable: false,
        },
      );
      await channel.assertQueue(QUEUE_NAME, { exclusive: false });
      await channel.bindQueue(
        QUEUE_NAME,
        this.settingService.getConfig().rabbitmq.exchange,
        this.settingService.getConfig().rabbitmq.signalRoutingKey,
      );
      await channel.consume(QUEUE_NAME, (data: ConsumeMessage) => {
        this.onXRayEvent(data).catch((err) => {
          this.logger.error('consume | error processing XRay event', err);
        });
      });
    });
    this.logger.debug('RabbitmqService | connected successfully.');
  }

  private async onXRayEvent(msg: ConsumeMessage) {
    if (!msg?.content) {
      return;
    }
    const content = msg.content.toString();
    const payload = JSON.parse(content) as IXRayRawSignal;
    await this.xrayInboundService.processSignal(payload);
  }
}
