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
COPY --from=build /usr/src/app .

# Deployment
ENV TZ Australia/Melbourne
EXPOSE 5050

CMD ["npm", "run", "reactive"]
