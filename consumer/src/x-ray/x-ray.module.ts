import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { XRayInboundService } from './x-ray-inbound.service';
import { XRay, XRaySchema } from './schemas';
import { XRayController } from './x-ray.controller';
import { XRayService } from './x-ray.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: XRay.name, schema: XRaySchema }]),
  ],
  controllers: [XRayController],
  providers: [XRayInboundService, XRayService],
  exports: [XRayInboundService],
})
export class XRayModule {}
