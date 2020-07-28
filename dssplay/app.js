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

const port = process.env.PORT || '5050';
app.set('port', port);

const server = http.createServer(app);
const sioc = require('socket.io-client');
const api = sioc('localhost:3035');

const io = socketIO(server);
// io.adapter(redisAdapter({
//   host: 'mq',
//   port: 6379
// }));



api.on('connection', (socket) => {
    console.log('API connected');

    socket.on('disconnect', function () {
        console.log('API has disconnected');
  });
});

io.on('connection', (socket) => {

  /* CONNECTION CODE */
  console.log('user connected');

  socket.on('disconnect', function () {
    io.emit('log', 'User (' + socket.id + ') has disconnected');
  });

  io.emit('log', 'User with Session ID: ' + socket.id + ' has connected.');

  console.log(api);

  api.emit('log', 'User with Session ID: ' + socket.id + ' has connected.');
  /* TASK CODE */

  // Add
  socket.on('task-queued', (data) => {
    console.log(data);
  });

  // Delete
  socket.on('purge', () => {
    api.emit('purge', {});

    api.on('purge-complete', () => {
      io.emit('purge-complete', {});
    });
  });


  socket.on('nth-color', (data) => {
    console.log('Passing nth color map call');
    api.emit('nth-color', data);

    api.on('color-map', (data) => {
      console.log('Passing back nth color results');
      socket.emit('color-map', data);
    });
  });

  socket.on('task-revoke', (task) => {
    console.log('Got revoke event for ' + task.uuid);
    api.emit('revoke', task.uuid);
    io.emit('log', 'Revoking: ' + task.uuid);

    api.on('task-revoked', (data) => {
      console.log('Task: ' + task.uuid + ' revoked.');
    });
  });

  // Modify
  socket.on('task-progress-request', (pr) => {
    api.emit('task-progress-request', pr);

    api.on('task-progress', (prog) => {
      socket.emit('task-progress', prog);
    });
  });

  /* QUERY CODE */

  // // Add Responder
  socket.on('query-queued', (data) => {
    console.log(data);
  });

  socket.on('time-series', (data) => {
    console.log('Got time-series call...');
    api.emit('time-series', data);

    api.on('time-series-results', (data) => {
      console.log('Got time-series response...');
      socket.emit('time-series-results', data);
    });
  });

  socket.on('metrics', (data) => {
    console.log('Got Metrics call...');
    api.emit('metrics', data);

    api.on('all-metrics', (data) => {
      console.log('Got Metrics response...');
      socket.emit('all-metrics', data);
    });
  });

  socket.on('list_project_metrics', (d) => {
    console.log('>>> Test <<<');


    const projects = [{
        name: 'Carbon',
        metrics: [{
          metric: 'fuel_consumed',
          active: true
        }, {
          metric: 'carbon_released',
          active: true
        }]
      },
      {
        name: 'People And Houses',
        metrics: [{
            metric: 'houses_exposed',
            active: true
          },
          {
            metric: 'houses_lost',
            active: true
          },
          {
            metric: 'com_build_exposed',
            active: true
          },
          {
            metric: 'com_build_lost',
            active: true
          },
          {
            metric: 'ind_build_exposed',
            active: true
          },
          {
            metric: 'ind_build_lost',
            active: true
          },
          {
            metric: 'people_exposed',
            active: true
          },
          {
            metric: 'people_lost_ratio_method',
            active: true
          },
          {
            metric: 'people_lost_harris_method',
            active: true
          }
        ]
      },
      {
        name: 'Water',
        metrics: []
      },
      {
        name: 'Infrastructure',
        metrics: [{
          metric: 'road_length_loss',
          active: true
        }, {
          metric: 'powerline_length_loss',
          active: true
        }]
      },
      {
        name: 'Regional Economy',
        metrics: []
      },
      {
        name: 'Bio Diversity',
        metrics: [{
            metric: 'num_wet_forest_veg_cells_burnt',
            active: true
          },
          {
            metric: 'num_refuge_cells_burnt',
            active: true
          },
          {
            metric: 'num_nature_print_cells_burnt',
            active: true
          },
          {
            metric: 'num_ldb_possum_cells_burnt',
            active: true
          }
        ]
      },
      {
        name: 'Viewsheds',
        metrics: [{
          metric: 'average_sbpa',
          active: true
        }]
      }
    ];
    socket.emit('project_metrics_list', projects);
  });

  // Add
  socket.on('submit-query', (stquery) => {
    let receipt = 'SpatioTemporalQuery from: ' + socket.id + '.';
    console.log('Node Server received new query: ' + receipt);

    api.on('query-queued', (data) => {
      console.log(data);

      // console.log('Query was queued with uuid=' + data['uuid']);
      // Re-emit downstream
      socket.emit('query-queued', stquery);

      socket.emit('task-queued', {
        'name': 'SpatioTemporalQuery',
        'uuid': data['uuid'],
        'submitted_by': socket.id,
        'submitted_at': moment().format(), // standard iso format
        'submitted_task': stquery,
        'status': data['status'],
        'progress': data['progress'],
        'priority': 1, // use time as proxy for priority?
        'results': data
      });

      io.emit('log', 'Task (Query) queued.');
      io.emit('log', data);
    });

    // Lodge work with api Worker upstream
    api.emit('query-submission', stquery);

    api.on('task-events', (s) => {

      console.log(s);
      socket.emit('task-events', s);
    });

    // Watch for partial/complete results...
    api.on('query-partial-results', (data) => {

      // Re-emit downstream
      socket.emit('query-partial-results', data);
      console.log(data['progress']);
      console.log(data['results']);
      io.emit('log', data['results']);
    });

    api.on('query-results', (data) => {

      console.log(data);
      // Re-emit downstream
      socket.emit('query-results', data);

      io.emit('log', data['results']);
    });
  });

  socket.on('list_datapath', (data) => {

    console.log('Sending datapath list request to python');
    api.emit('list_datapath', data);

    api.on('datapath_list', (data) => {

      console.log(data);
      // Re-emit downstream
      socket.emit('datapath_list', data);

      io.emit('log', 'Got datapath results: ' + data);
    });
  });

  socket.on('list_spatial', (data) => {
    console.log('Now listing spatial projects');

    api.emit('list_spatial', data);

    api.on('spatial_list', (data) => {

      console.log(data);
      // Re-emit downstream
      socket.emit('spatial_list', data);

      io.emit('log', 'Got spatial_list results: ' + data);
    });
  });

  socket.on('list_temporal', (data) => {
    console.log('Now listing temporal projects');

    api.emit('list_temporal', data);

    api.on('temporal_list', (data) => {

      console.log(data);
      // Re-emit downstream
      socket.emit('temporal_list', data);

      io.emit('log', 'Got temporal_list results: ' + data);
    });
  });

  // socket.on('frappe_dss', (data) => {
  //
  //   api.emit('frappe_dss', data);
  //
  //   api.on('dss_frappe', (data) => {
  //
  //     console.log(data);
  //     // Re-emit downstream
  //     socket.emit('dss_frappe', data);
  //
  //     io.emit('log', 'Got dss_frappe results: ' + data);
  //   });
  // });

  socket.on('frappe_results', (data) => {
    console.log('Summary request as follows:');
    console.log(data);

    api.emit('frappe_results', data);

    api.on('results_frappe', (data) => {
      socket.emit('results_frappe', data);
      io.emit('log', 'Got Filtered Summary results: ' + data);
      console.log(data);
    });
  });


  /* LOGGING CODE */
  // Add
  socket.on('log-entry', (entry) => {
    console.log(entry);
    socket.emit('log', entry);
  });


});

server.listen(port, () => {
  console.log(package.title + ' Server (v'+ package.version +') running on', port);
});
