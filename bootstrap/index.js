
var path = require("path");
var express = require("express");
var app = express();
var _ = require("lodash");
var colors = require("colors");

var loadRouter = function (_path, name) {
	app.use(_path, require(path.resolve(__dirname, "..", "api", "routes", name)) );
}

global.ENV = function (name, defaultValue) { return _.get(process.env, name, defaultValue); }
global.ENVisDevelop = function () { return (ENV("NODE_ENV", "develop") === "develop"); }

if (ENVisDevelop()) {
	app.set('json spaces', 4);
}


loadRouter("/store", "store");
loadRouter("/manager", "manager");



var server = app.listen(80, function () {
	var address = server.address();
	var host = "http://[" + ((address.address == "::") ? "::1" : address.address) + "]:" + address.port;

	if (address.family == "IPv6") {
		console.log("Server is Open: " + host.green);
	}
})
