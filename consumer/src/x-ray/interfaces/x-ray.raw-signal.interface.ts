export interface IXRayRawSignal {
  [key: string]: {
    data: [number, [number, number, number]][];
    time: number;
  };
}
