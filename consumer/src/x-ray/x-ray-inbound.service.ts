import { Injectable, Logger } from '@nestjs/common';
import { IXRayRawSignal } from './interfaces';
import { convertRawXRay } from '../utils';
import { XRayService } from './x-ray.service';

@Injectable()
export class XRayInboundService {
  private readonly logger = new Logger(XRayInboundService.name);

  constructor(private readonly xrayService: XRayService) {}

  async processSignal(rawSignal: IXRayRawSignal) {
    for (const model of convertRawXRay(rawSignal)) {
      await this.xrayService.create(model);
    }
  }
}
