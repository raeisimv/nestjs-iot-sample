import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindNearbyDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  lng: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  lat: number;
}
