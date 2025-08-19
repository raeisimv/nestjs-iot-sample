import { Body, Controller, Get, Post } from '@nestjs/common';
import { XRayService } from './x-ray.service';
import * as interfaces from './interfaces';

@Controller('XRay')
export class XRayController {
  constructor(private readonly xrayService: XRayService) {}

  @Get()
  getDeviceIds() {
    return this.xrayService.getDeviceIds();
  }

  @Post()
  addSignal(@Body() device: interfaces.IXRayModel) {
    return this.xrayService.create(device);
  }
}
