import { Injectable, Logger } from '@nestjs/common';
import { IXRayRawSignal } from './interfaces';

@Injectable()
export class XRayInboundService {
  private readonly logger = new Logger(XRayInboundService.name);

  processSignal(rawSignal: IXRayRawSignal) {
    this.logger.log('processSignal', rawSignal);
  }
}
