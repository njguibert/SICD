
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/sistema',routes.sistema);
app.get('/collection/options/',routes.getOptions);
app.get('/collection/clients/',routes.getClients);
app.get('/collection/devices/',routes.getDevices);
app.post('/collection/devices/',routes.addDevice);
app.post('/model/client/new',routes.clientnew);
app.post('/model/device/new',routes.devicenew);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
