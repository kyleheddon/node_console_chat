// Generated by CoffeeScript 1.5.0
(function() {
  var app, express, io, socket;

  express = require('express');

  app = module.exports = express.createServer();

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('stylus').middleware({
      src: __dirname + '/public'
    }));
    app.use(app.router);
    app.use(express["static"](__dirname + '/public'));
    return app.use('/', express["static"](__dirname + '/lib/assets'));
  });

  app.configure('development', function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure('production', function() {
    return app.use(express.errorHandler());
  });

  socket = require('socket.io');

  io = socket.listen(app);
  io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
  });

  io.on('connection', function(client) {  
    client.broadcast.emit('message', 'Client connected...');
    console.log('Client connected...');
    return client.on('message', function(message) {
      console.log(message);
      return setTimeout(function() {
        client.broadcast.emit('message', message);
        return client.emit('message', 'ahh');
      }, 1000);
    });
  });

  app.get('/', function(req, res) {
    return res.render('index.jade');
  });

  app.listen(process.env.PORT || 5000);

}).call(this);
