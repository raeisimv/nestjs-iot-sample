import { Injectable, Logger } from '@nestjs/common';
import { IXRayModel, IXRayRawSignal } from './interfaces';
import { XRayService } from './x-ray.service';
import { convertRawXRay } from '../utils';

@Injectable()
export class XRayInboundService {
  private readonly logger = new Logger(XRayInboundService.name);

  constructor(private readonly xrayService: XRayService) {}

  async processSignal(rawSignal: IXRayRawSignal) {
    // this.logger.log('processSignal', rawSignal);
    const records = convertRawXRay(rawSignal);

    for (const record of records) {
      await this.xrayService.create(record);
    }
  }
}
