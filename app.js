var express = require('express'),
	params = require('express-params'),
	routes = require('./routes'),
	user = require('./routes/user'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path'),
	stylus = require('stylus'),
	nib = require('nib');

var app = express();
params.extend(app);

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	//app.use(express.session());
	app.use(app.router);
	app.use(stylus.middleware({
		src: __dirname + '/public',
		compile: compile
	}));
	app.use(express.compress());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(__dirname, '/notes'));
	app.use(express.directory(__dirname, {'icons':true, url:'/notes'}));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

function compile(str,path){
	return stylus(str)
		.set('filename', path)
		//.set('compress', true)
		.use(nib())
		.import('nib');
}

app.get('/', routes.index);

app.param(':request', /^.+$/);
app.get('/api/:request', api);

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});
