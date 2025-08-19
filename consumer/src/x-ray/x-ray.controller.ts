import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { XRayService } from './x-ray.service';
import * as interfaces from './interfaces';

@Controller('api/xray')
@ApiTags('XRay')
export class XRayController {
  constructor(private readonly xrayService: XRayService) {}

  @Get(':id')
  getDevice(@Param('id') deviceId: string) {
    return this.xrayService.getLatestRecord(deviceId);
  }
  @Get()
  getDeviceIds() {
    return this.xrayService.getDeviceIds();
  }

  @Post()
  addSignal(@Body() device: interfaces.IXRayModel) {
    return this.xrayService.create(device);
  }
}
