import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { XRay, XRayDocument } from './schemas';
import { IXRayModel } from './interfaces';

@Injectable()
export class XRayService {
  private readonly logger = new Logger(XRayService.name);

  constructor(
    @InjectModel(XRay.name) private readonly xrayModel: Model<XRay>,
  ) {}

  async create(model: IXRayModel) {
    try {
      const res = await this.xrayModel.create(model);
      return res;
    } catch (e) {
      this.logger.error('create | cannot create XRay', e);
    }
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
