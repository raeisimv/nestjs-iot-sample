export async function publish(routingKey, payload) {
    // log it for now
    console.log('publishing', routingKey, Object.keys(payload)[0])
}