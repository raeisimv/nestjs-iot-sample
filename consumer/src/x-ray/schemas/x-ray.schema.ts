import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Location, LocationSchema } from './location.schema';
import { HydratedDocument } from 'mongoose';
import * as Buffer from 'node:buffer';

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
})
export class XRay {
  @Prop({ required: true, index: true })
  deviceId: string;

  @Prop({ required: true })
  timestamp: number;

  @Prop()
  dataLength: number;

  @Prop()
  dataSize: number;

  @Prop({ type: [LocationSchema] })
  locations: Location[];
}

export type XRayDocument = HydratedDocument<XRay>;
export const XRaySchema = SchemaFactory.createForClass(XRay);

XRaySchema.index({ 'locations.location': '2dsphere' });
XRaySchema.pre('save', function (next) {
  if (this.locations?.length) {
    this.dataLength = this.locations.length;
    this.dataSize = Buffer.Buffer.byteLength(
      JSON.stringify(this.toObject()),
      'utf8',
    );
  } else {
    this.dataLength = 0;
    this.dataSize = 0;
  }
  next();
});
