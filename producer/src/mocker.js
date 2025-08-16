const deviceIds = [
    {
        id: '66bb584d4ae73e488c30a072',
        data: [
            762,
            [
                51.339764,
                12.339223833333334,
                1.2038000000000002,
            ]
        ]
    },
    {
        id: '36bb584d4ae73e488c30a073',
        data: [
            762,
            [
                51.339764,
                12.339223833333334,
                1.2038000000000002,
            ]
        ]
    },
    {
        id: '46bb584d4ae73e488c30a074',
        data: [
            762,
            [
                51.339764,
                12.339223833333334,
                1.2038000000000002,
            ]
        ]
    },
];

function generateMockedRecord([time, geo] = []) {
    const newTime = time + Math.floor(Math.random() * 101) + 20; // 20 - 120 ms
    const newX = geo[0] + (Math.random() - 0.5) * 0.00002;
    const newY = geo[1] + (Math.random() - 0.5) * 0.00002;
    const newSpeed = Math.max(0, geo[2] + (Math.random() - 0.5) * 0.2);
    return [
        newTime,
        [
            newX,
            newY,
            newSpeed
        ]
    ];
}

export function generateRandomRecord() {
    // choose a device
    const device = deviceIds[Math.floor(Math.random() * deviceIds.length)];

    // generate 100-800 mocked records
    const recordCount = Math.floor(Math.random() * 700) + 100;
    const data = Array.from({length: recordCount});
    for (let i = 0; i < data.length; i++) {
        const newRecord = generateMockedRecord(device.data);
        data[i] = newRecord;
        device.data = newRecord;
    }
    return {
        [device.id]: {
            data,
            time: new Date().getTime(),
        }
    }
}
