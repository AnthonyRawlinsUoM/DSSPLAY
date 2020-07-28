FROM node:lts-alpine3.11 as build
MAINTAINER Anthony Rawlins <anthony.rawlins@unimelb.edu.au>

# Make working dir
WORKDIR /usr/src/app

# RUN npm i -g npm

COPY . .
RUN npm install --no-optional

RUN mkdir -p /usr/src/app/dist

COPY ./dist ./dist

# Clean slate
FROM node:lts-alpine3.11
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/dist
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/app.js ./app.js
# Deployment
ENV TZ Australia/Melbourne
EXPOSE 5050

CMD ["npm", "run", "reactive"]
