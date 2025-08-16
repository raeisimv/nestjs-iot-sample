import {generateRandomRecord} from "./mocker.js";

async function main() {
    const mock = generateRandomRecord();
    console.log(mock);
}

main()
    .finally(() => {
        console.log('app finally is done')
    })