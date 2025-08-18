export interface IRabbitmqConfig {
    hostname: string;
    username: string;
    password: string;
    exchange: string;
    signalRoutingKey: string;
}