export interface IXRayModel {
  deviceId: string;
  timestamp: number;
  locations: {
    time: number;
    location: {
      type: 'Point' | 'Line' | 'Polygon';
      coordinates: number[];
    };
    speed: number;
  }[];
}
