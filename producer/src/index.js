import {generateRandomRecord} from "./mocker.js";
import {publish} from "./rabbitmq.js";

async function main() {
    while (true) {
        const mockedRecord = generateRandomRecord();
        await publish('iot.signal', mockedRecord);

        const sleepTimeout = Math.floor((Math.random() * 1000) + 500);
        await new Promise(resolve => setTimeout(resolve, sleepTimeout));
    }
}

main()
    .finally(() => {
        console.log('app finally is done')
    })