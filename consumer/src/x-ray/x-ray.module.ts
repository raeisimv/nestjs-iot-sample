import { Module } from '@nestjs/common';
import { XRayInboundService } from './x-ray-inbound.service';

@Module({
  providers: [XRayInboundService],
  exports: [XRayInboundService],
})
export class XRayModule {}
