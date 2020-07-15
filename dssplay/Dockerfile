FROM node:current-alpine
MAINTAINER Anthony Rawlins <anthony.rawlins@unimelb.edu.au>

# Make working dir
WORKDIR /usr/src/app

# RUN npm i -g npm

COPY . .
RUN npm install --no-optional

# DEVELOPMENT
# EXPOSE 3335

# Deployment
EXPOSE 5050

ENV TZ Australia/Melbourne

CMD ["npm", "run", "reactive"]
