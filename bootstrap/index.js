
var pkg = require("../package.json");
var path = require("path");
var express = require("express");
var app = express();
var _ = require("lodash");
var colors = require("colors");
var compression = require('compression');

var loadRouter = function (_path, name) {
	app.use(_path, require(path.resolve(__dirname, "..", "api", "routes", name)) );
}


global.ENV = function (name, defaultValue) { return _.get(process.env, name, defaultValue); }
global.ENVisDevelop = function () { return (ENV("NODE_ENV", "develop") === "develop"); }

if (ENVisDevelop()) {
	app.set('json spaces', 4);
}



app.set("x-powered-by", false);
app.use(function (req, res, next) {
	res.setHeader("X-Powered-By", "Cumulus Cloud v" + pkg.version + "")
	next();
});

if (ENVisDevelop()) {
	app.use(function (req, res, next) {
		console.log('%s %s %s', req.method, req.url, req.path);
		next();
	});
}

// GZIP Compress
app.use(compression());

loadRouter("/store", "store");
loadRouter("/manager", "manager");



var server = app.listen(ENV("PORT", 80), function () {
	var address = server.address();
	var host = "http://[" + ((address.address == "::") ? "::1" : address.address) + "]:" + address.port;

	if (address.family == "IPv6") {
		console.log("Server is Open: " + host.green);
	}
});
