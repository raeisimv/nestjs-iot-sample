import { Module } from '@nestjs/common';
import { XRayInboundService } from './x-ray-inbound.service';
import { MongooseModule } from '@nestjs/mongoose';
import { XRay, XRaySchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: XRay.name, schema: XRaySchema }]),
  ],
  providers: [XRayInboundService],
  exports: [XRayInboundService],
})
export class XRayModule {}
