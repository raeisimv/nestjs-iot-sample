import rabbitMQ from "amqplib";

export async function initRabbitMQ() {
    const username = process.env.RABBITMQ_DEFAULT_USER;
    const password = process.env.RABBITMQ_DEFAULT_PASS;
    const hostname = process.env.RABBITMQ_HOST;
    const exchange = process.env.RABBITMQ_EXCHANGE;
    const signalRoutingKey = process.env.RABBITMQ_ROUTING_KEY_SIGNAL;
    console.log('RabbitMQ is connecting to', {
        hostname,
        exchange,
        signalRoutingKey,
        username,
    })

    const conn = await rabbitMQ.connect({
        hostname,
        username,
        password,
    });
    console.log('RabbitMQ Connected. creating channel ...',)
    const ch = await conn.createChannel();
    await ch.assertExchange(exchange, 'topic', {durable: false}); // delete the exchange on rabbit restart
    console.log('RabbitMQ connection started.');

    return async (payload, routingKey = signalRoutingKey) => {
        await ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload), "utf8"));
        // console.log('publishing to', routingKey, Object.keys(payload)[0]);
    }
}