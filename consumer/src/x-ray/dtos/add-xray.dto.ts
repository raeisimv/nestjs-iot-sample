import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GeoLocationDto {
  @ApiProperty({
    description: 'The GeoJSON type of the location.',
    enum: ['Point', 'Line', 'Polygon'],
    example: 'Point',
  })
  @IsIn(['Point', 'Line', 'Polygon'])
  type: 'Point' | 'Line' | 'Polygon';

  @ApiProperty({
    description: 'The coordinates of the location.',
    example: [12.3392238, 51.339764],
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: number[];
}

export class LocationDto {
  @ApiProperty({
    description: 'The timestamp of the location reading.',
    example: 1672531200000,
  })
  @IsNumber()
  time: number;

  @ApiProperty({ type: GeoLocationDto })
  @ValidateNested({ each: true })
  @Type(() => GeoLocationDto)
  location: GeoLocationDto;

  @ApiProperty({
    description: 'The speed at the time of the reading.',
    example: 1.2,
  })
  @IsNumber()
  speed: number;
}

export class AddXrayDto {
  @ApiProperty({
    description: 'The unique identifier for the device.',
    example: '46bb584d4ae73e488c30a074',
  })
  @IsString()
  deviceId: string;

  @ApiProperty({
    description: 'The main timestamp for the data entry.',
    example: 1755514748683,
  })
  @IsNumber()
  timestamp: number;

  @ApiProperty({ type: [LocationDto] })
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  locations: LocationDto[];
}
