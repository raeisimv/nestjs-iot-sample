import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { XRayService } from './x-ray.service';
import { AddXrayDto } from './dtos';

@Controller('api/xray')
@ApiTags('XRay')
export class XRayController {
  constructor(private readonly xrayService: XRayService) {}

  @Get('nearby')
  findNearby(
    @Query('lng') lng: number,
    @Query('lat') lat: number,
    @Query('distance') distance: number,
  ) {
    return this.xrayService.findNearby(lng, lat, distance);
  }

  @Get(':id')
  getDevice(@Param('id') deviceId: string) {
    return this.xrayService.getLatestRecord(deviceId);
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
