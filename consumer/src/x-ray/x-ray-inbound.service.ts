import { Injectable, Logger } from '@nestjs/common';
import { IXRayRawSignal } from './interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { XRay } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class XRayInboundService {
  private readonly logger = new Logger(XRayInboundService.name);

  constructor(
    @InjectModel(XRay.name) private readonly xrayModel: Model<XRay>,
  ) {}

  async processSignal(rawSignal: IXRayRawSignal) {
    // this.logger.log('processSignal', rawSignal);
    const records = Object.keys(rawSignal).map((deviceId: string) => ({
      deviceId,
      timestamp: rawSignal[deviceId].time,
      locations: rawSignal[deviceId].data.map((x) => ({
        time: x[0],
        location: {
          type: 'Point',
          coordinates: [x[1][1], x[1][0]],
        },
        speed: x[1][2],
      })),
    }));

    for (const record of records) {
      await this.xrayModel.create(record);
    }
  }
}
