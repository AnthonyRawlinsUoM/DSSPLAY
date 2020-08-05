const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const socketIO = require('socket.io');
const redisAdapter = require('socket.io-redis');

const app = express();
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const package = require('./package.json');
const R = require('ramda');

const { Pool, Client } = require('pg');
const client = new Client();
const pool = new Pool();

client.connect();

client.query('SELECT $1::text as message', ['Postgres client says: Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  client.end()
});

app.use(express.static(path.join(__dirname, '/dist/dssplay')));

app.use(function (req, res, next) {
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/dssplay/index.html'))
});

const port = process.env.PORT || '4040';
app.set('port', port);

const server = http.createServer(app);
const sioc = require('socket.io-client');
// const api = sioc('localhost:3035');

const io = socketIO(server);
// io.adapter(redisAdapter({
//   host: 'mq',
//   port: 6379
// }));

io.on('connection', (socket) => {
  /* CONNECTION CODE */
  broadcast(io, 'User with Session ID: ' + socket.id + ' has connected.');
  log(socket, 'Your socket ID is: ' + socket.id);

  socket.on('disconnect', function () {
    broadcast(io, 'User (' + socket.id + ') has disconnected');
  });

  log(socket, 'Welcome to ' + package.name + ' v' + package.version );

  /* QUERY CODE */
  socket.on('sql-query', (envelope) => {
    log(socket, 'Got message from website: ' + envelope.sql);
    pool.query(envelope.sql).then(
        res => {
            // const result = res.rows.map(x => x[2]);
            // const fields = res.fields.map(field => field.name);
            log(socket, 'Server got envelope from: ' + socket.id);
            log(socket, 'Sending response: ' + res.rows);

            socket.emit('sql-response', { sender: envelope.sender, result: res.rows });
    }).catch(e => {
        socket.error(e);
        log(socket, 'Error: ' + socket.id + e.stack);
    });
  });

  /* LOGGING CODE */
  socket.on('log-entry', (entry) => {
    log(socket, entry);
  });

});

server.listen(port, () => {
  console.log(package.name + ' Server (v'+ package.version +') running on', port);
});

function broadcast(io, message) {
    io.emit('[' + moment().format() + '] ', message);
}

function log(socket, message) {
    // msg_str = '[' + moment().format() + '] ' + message;
    console.log(message);
    socket.emit('log', {timestamp: moment().format(), message: message});
}
