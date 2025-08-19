import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { XRay, XRayDocument } from './schemas';
import { Model } from 'mongoose';
import { IXRayModel } from './interfaces';

@Injectable()
export class XRayService {
  private readonly logger = new Logger(XRayService.name);

  constructor(
    @InjectModel(XRay.name) private readonly xrayModel: Model<XRay>,
  ) {}

  create(model: IXRayModel) {
    console.log(JSON.stringify(model, null, 2));
    return this.xrayModel.create(model);
  }

  async getLatestRecord(deviceId: string) {
    const rec: XRayDocument | null = await this.xrayModel.findOne(
      { deviceId },
      {},
      { sort: { createdAt: -1 } },
    );
    return rec?.toJSON();
  }

  getDeviceIds() {
    return this.xrayModel.find().distinct('deviceId');
  }
}
