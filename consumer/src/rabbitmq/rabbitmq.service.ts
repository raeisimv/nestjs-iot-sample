import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfirmChannel, ConsumeMessage } from 'amqplib';
import { SettingsService } from '../settings/settings.service';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { XRayInboundService } from '../x-ray/x-ray-inbound.service';
import { IXRayRawSignal } from '../x-ray/interfaces';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private readonly logger = new Logger(RabbitmqService.name);
  private channel: ChannelWrapper;

  constructor(
    private readonly settingService: SettingsService,
    private readonly xrayInboundService: XRayInboundService,
  ) {}

  async onModuleInit() {
    this.logger.debug('RabbitmqService | initializing ...');
    const conn = amqp.connect({
      hostname: this.settingService.getConfig().rabbitmq.hostname,
      username: this.settingService.getConfig().rabbitmq.username,
      password: this.settingService.getConfig().rabbitmq.password,
    });

    this.logger.debug('RabbitmqService | connected, creating channel ...');
    this.channel = conn.createChannel();
    await this.channel.addSetup(async (channel: ConfirmChannel) => {
      await channel.assertExchange(
        this.settingService.getConfig().rabbitmq.exchange,
        'topic',
        {
          durable: false,
        },
      );
      const QUEUE_NAME = 'consumer.x-ray';
      await channel.assertQueue(QUEUE_NAME, { exclusive: false });
      await channel.bindQueue(
        QUEUE_NAME,
        this.settingService.getConfig().rabbitmq.exchange,
        this.settingService.getConfig().rabbitmq.signalRoutingKey,
      );
      await channel.consume(QUEUE_NAME, this.onXRayEvent.bind(this));
    });
    this.logger.debug('RabbitmqService | connected successfully.');
  }

  private onXRayEvent(msg: ConsumeMessage) {
    // this.logger.debug('RabbitmqService | onXRayEvent');
    if (!msg?.content) {
      return;
    }
    const content = msg.content.toString();
    const payload = JSON.parse(content) as IXRayRawSignal;
    this.xrayInboundService.processSignal(payload);
  }
}
