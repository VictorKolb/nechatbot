FROM node:12.10.0-alpine

RUN apk update
RUN apk upgrade

#set timezone
RUN apk add --update tzdata
ENV TZ=Europe/Moscow

# Создать директорию app
WORKDIR /app

# Установить зависимости приложения
# Используется символ подстановки для копирования как package.json, так и package-lock.json,
# работает с npm@5+
COPY package.json ./
COPY yarn.lock ./
COPY .babelrc ./

RUN npx yarn install
# Используется при сборке кода в продакшене
# RUN npm install --only=production

# Скопировать исходники приложения
COPY src /app

CMD [ "node", "app.js" ]