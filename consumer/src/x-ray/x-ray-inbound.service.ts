import { Injectable, Logger } from '@nestjs/common';
import { IXRayModel, IXRayRawSignal } from './interfaces';
import { XRayService } from './x-ray.service';

@Injectable()
export class XRayInboundService {
  private readonly logger = new Logger(XRayInboundService.name);

  constructor(private readonly xrayService: XRayService) {}

  async processSignal(rawSignal: IXRayRawSignal) {
    // this.logger.log('processSignal', rawSignal);
    const records = Object.keys(rawSignal).map<IXRayModel>(
      (deviceId: string) => ({
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
      }),
    );

    for (const record of records) {
      await this.xrayService.create(record);
    }
  }
}
