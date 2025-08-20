### X-Ray
A nestjs application to produce and process X-Ray signals

### Project setup
This project leverages `docker-compose` to setup and run. Clone the code and run the docker compose file:

```shell
  git clone https://github.com/raeisimv/nestjs-iot-sample.git && \
  cd nestjs-iot-sample && \
  sudo docker compose up -d --build && \
  sudo docker compose logs --tail 100 -f
```
Navigate to http://localhost:3000/swagger to interact with APIs.

MongoDB Express is served at http://localhost:8081 where you can observe the data insertion.