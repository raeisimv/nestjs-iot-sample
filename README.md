# Nest.js Producer and Consumer Service
A sample nestjs application to produce and process X-Ray signals. There two services: `consumer` and `producer`, which the producer service mocks and emits signals via RabbitMQ then the consumer service consumes and processes the signals.

## Project setup
This project utilizes `docker-compose` to setup and run. Clone the code and run the docker compose file:

```shell
  git clone https://github.com/raeisimv/nestjs-iot-sample.git && \
  cd nestjs-iot-sample && \
  sudo docker compose up -d --build && \
  sudo docker compose logs --tail 100 -f
```
The **Swagger** is available at http://localhost:3000/swagger to interact with APIs.

The **Mongo DB Express** is available at http://localhost:8081 where you can observe the data insertion.

## Project Structure
### Producer
The producer is a simple bare Node.js service that mocks and emits signals via RabbitMQ. The service does not use Nest.js framework intentionally since it is a simple mocker app.

### Consumer
The consumer is a multi-module Nest.js service that consumes, processes, stores, indexes, and queries signals from RabbitMQ.

### Configuration and Settings
This project assumes that all configurations are read from the environment variables. The list of possible configuration keys is represented in the `.env` file located in the root directory. 

**IMPORTANT** The `.env` file is controlled by the git repository here for development purposes. In real scenarios, these configurations are managed by a configuration management system like HashiCorp Vault or AWS Secrets Manager.
