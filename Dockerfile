FROM node:alpine AS build
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci
ADD . /app/
RUN npm run build

FROM node:alpine
ENV NODE_ENV dev
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci
COPY --from=build /app/dist/ /app/src
COPY ormconfig.js /app/
CMD node /app/src/server.js