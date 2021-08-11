FROM keymetrics/pm2:16-slim

WORKDIR /usr/src/app
COPY package*.json ./

# libc6_2.29 is required by better-sqlite3
RUN apt-get update &&\
    apt-get upgrade -y &&\
    apt-get install build-essential wget procps -y &&\
    wget https://launchpad.net/ubuntu/+source/glibc/2.29-0ubuntu2/+build/16599428/+files/libc6_2.29-0ubuntu2_amd64.deb &&\
    dpkg -i libc6_2.29-0ubuntu2_amd64.deb &&\
    rm libc6_2.29-0ubuntu2_amd64.deb

RUN npm install && npm audit fix

COPY . .

EXPOSE 3000
CMD [ "pm2-runtime", "start", "ecosystem.config.js"]
