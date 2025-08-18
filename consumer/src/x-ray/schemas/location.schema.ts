import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: false, _id: false, versionKey: false })
export class Location {
  @Prop({ required: true })
  time: number;

  @Prop({ type: { type: String, enum: ['Point'], required: true } })
  location: {
    type: string;
    coordinates: [number];
  };

  @Prop({ required: true })
  speed: number;
}

export type LocationDocument = HydratedDocument<Location>;
export const LocationSchema = SchemaFactory.createForClass(Location);
