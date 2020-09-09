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
const pd = require("node-pandas")
const events = require('events').EventEmitter.prototype._maxListeners = 100;

var types = require('pg').types
types.setTypeParser(20, function(val) {
  return parseInt(val)
});
types.setTypeParser(types.builtins.NUMERIC, function(val) {
  return parseFloat(val)
});
types.setTypeParser(types.builtins.REAL, function(val) {
  return parseFloat(val)
})

const {
    Pool,
    Client
} = require('pg');

const client = new Client('postgresql://postgres:secret@192.168.1.188:5432/WHOLE_TOMATOES');

const pool = new Pool({
    connectionString: 'postgresql://postgres:secret@192.168.1.188:5432/WHOLE_TOMATOES',
    max: 100
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

app.use(express.static(path.join(__dirname, '/dist/dssplay')));

app.use(function(req, res, next) {
    app.use(function(req, res, next) {

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

io
    .on('connection', (socket) => {

        pool
            .connect()
            .then(client => {
                /* CONNECTION CODE */
                broadcast(io, 'User with Session ID: ' + socket.id + ' has connected.');
                log(socket, 'Your socket ID is: ' + socket.id);

                socket
                .on('OK',
                    (ack) => {
                        log(socket, 'Got OK ack. Freeing resources.')
                        // client.end();
                    },
                    (err) => {
                        console.error(err);
                    });


                socket
                    .on('disconnect', function() {
                        broadcast(io, 'User (' + socket.id + ') has disconnected');
                    });

                log(socket, 'Welcome to ' + package.name + ' v' + package.version);

                /* QUERY CODE */
                socket
                    .on('sql-query', (envelope) => {
                        log(socket, socket.id);
                        log(socket, 'Got message from website: ' + envelope.sql);
                        log(socket, 'Server got envelope from: ' + socket.id);

                        client
                            .query(envelope.sql)
                            .then(
                                result => {
                                    log(socket, 'Sending response now.');
                                    socket.emit('sql-response', {
                                        sender: envelope.sender,
                                        result: result.rows
                                    });


                            })
                    })

                        socket
                            .on('summarysql-query', (envelope) => {
                                log(socket, socket.id);
                                log(socket, 'Got message from website: ' + envelope.sql);
                                log(socket, 'Server got envelope from: ' + socket.id);

                                client
                                    .query(envelope.sql)
                                    .then(
                                        result => {
                                            log(socket, 'Sending response now.');

                                            socket.emit('summarysql-response', {
                                                sender: envelope.sender,
                                                result: result.rows
                                            });
                                    })
                            })


                /* LOGGING CODE */
                socket
                    .on('log-entry', (entry) => {
                        log(socket, entry);
                    });

                pool
                    .on('connect', client => {
                        console.log('Using connection pool for query.');
                        console.log(pool.idleCount + ' (idle) ' + pool.waitingCount + ' (waiting) Total: ' + pool.totalCount);
                    });

                pool
                    .on('remove', client => {
                        console.log('Client removed from connection pool.');
                        console.log(pool.idleCount + ' (idle), ' + pool.waitingCount + ' (waiting), Total: ' + pool.totalCount);
                    })

            })
            .catch(e => {
                socket.error(e);
                log(socket, 'Error: ' + socket.id + e.stack);
            })
            .finally(() => client.end());

    });

server.listen(port, () => {
    console.log(package.name + ' Server (v' + package.version + ') running on', port);
});

function broadcast(io, message) {
    io.emit('[' + moment().format() + '] ', message);
}

function log(socket, message) {
    // msg_str = '[' + moment().format() + '] ' + message;
    console.log(message);
    socket.emit('log', {
        timestamp: moment().format(),
        message: message
    });
}
