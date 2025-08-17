FROM node:22-alpine
LABEL  name="IoT-Producer" author="Raeisi"

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]

