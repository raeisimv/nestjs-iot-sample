import { convertRawXRay } from './convert-raw-xray.util';
import { IXRayModel } from '../x-ray/interfaces';

describe('Utils', () => {
  beforeEach(async () => {});

  describe('convert XRay model', () => {
    it('should convert raw XRay signal to XRay model', () => {
      const act = convertRawXRay({
        '66bb584d4ae73e488c30a072': {
          data: [
            [7620, [51.339764, 12.33922, 1.203803]],
            [1766, [51.339777, 12.33923, 1.531604]],
          ],
          time: 674388847996,
        },
      });
      const exp = [
        {
          deviceId: '66bb584d4ae73e488c30a072',
          timestamp: 674388847996,
          locations: [
            {
              time: 7620,
              location: {
                type: 'Point',
                coordinates: [12.33922, 51.339764],
              },
              speed: 1.203803,
            },
            {
              time: 1766,
              location: {
                type: 'Point',
                coordinates: [12.33923, 51.339777],
              },
              speed: 1.531604,
            },
          ],
        },
      ] as IXRayModel[];
      expect(act).toEqual(exp);
    });
  });
});
