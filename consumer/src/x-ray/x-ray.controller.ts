import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AddXrayDto, FindNearbyDto } from './dtos';
import { XRayService } from './x-ray.service';

@Controller('api/xray')
@ApiTags('XRay')
export class XRayController {
  constructor(private readonly xrayService: XRayService) {}

  @Get(':id')
  getDevice(@Param('id') deviceId: string) {
    return this.xrayService.getLatestRecord(deviceId);
  }

  @Get('nearby')
  findNearby(@Query() q: FindNearbyDto) {
    return this.xrayService.findNearby(q.lng, q.lat);
  }

  @Get()
  getDeviceIds() {
    return this.xrayService.getDeviceIds();
  }

  @Post()
  addSignal(@Body() device: AddXrayDto) {
    return this.xrayService.create(device);
  }
}
