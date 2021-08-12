# Discord bot powered by Express.js
This is a simple discord bot wrapped with express.js to serve API and sqlite as satabase to store user information (ready to use but not connected yet).

## Integrations
The project is integrated with Docker engine (docker-compose) and pm2 process manager (docker integrated watch mode and hot reaload).

## How to run 
The first thing you need to do is to create a `.env` file in root project folder.
```shell
# .env example
PORT=YOUR_PORT
TOKEN=YOUR_DISCORD_TOKEN
APIKEY=YOUR_APIKEY
```
Then to run with both `docker` and `pm2-runtime` simply use: 
```
docker-compose up --build
``` 
Alternatively to run only with `pm2` use: 
```
npm run start
```
...or to run with only `node`:
```
npm run dev
```
