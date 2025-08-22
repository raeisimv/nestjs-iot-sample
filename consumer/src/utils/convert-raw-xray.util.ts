import { IXRayModel, IXRayRawSignal } from '../x-ray/interfaces';

export function convertRawXRay(rawSignal: IXRayRawSignal) {
  return Object.keys(rawSignal).map<IXRayModel>((deviceId: string) => ({
    deviceId,
    timestamp: rawSignal[deviceId].time,
    locations: rawSignal[deviceId].data.map((x) => ({
      time: x[0],
      location: {
        type: 'Point',
        coordinates: [x[1][1], x[1][0]],
      },
      speed: x[1][2],
    })),
  }));
}
