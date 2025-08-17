import {generateRandomRecord} from "./mocker.js";
import {initRabbitMQ} from "./rabbitmq.js";

async function main() {
    console.log('initializing...');
    const publish = await initRabbitMQ();

    console.log('start generating IoT signals ...')
    while (true) {
        const mockedRecord = generateRandomRecord();
        await publish(mockedRecord);

        const sleepTimeout = Math.floor((Math.random() * 1000) + 500);
        await new Promise(resolve => setTimeout(resolve, sleepTimeout));
    }
}

main()
    .finally(() => {
        console.log('app finally is done')
    })