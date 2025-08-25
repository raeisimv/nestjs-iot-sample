import {generateRandomRecord} from "./mocker.js";
import {initRabbitMQ} from "./rabbitmq.js";

async function main() {
    console.log('initializing...');

    let publish;
    for (let i = 0; i < 50; i++) {
        try {
            publish = await initRabbitMQ();
            break;
        } catch (err) {
            console.error('main | rabbitmq error', i, err);
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    if (!publish) {
        throw new Error('main | rabbitmq connection failed');
    }

    console.log('main | start generating IoT signals ...')
    while (true) {
        const mockedRecord = generateRandomRecord();
        await publish(mockedRecord);

        // wait
        const sleepTimeout = Math.floor((Math.random() * 1000) + 500);
        await new Promise(resolve => setTimeout(resolve, sleepTimeout));
    }
}

main()
    .finally(() => {
        console.log('app finally is done')
    })