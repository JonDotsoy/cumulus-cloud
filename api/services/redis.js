
var redis = require("redis");
var redisConfig = require("../../config/connect").redis || {};

var client = redis.createClient(redisConfig);

client.on("error", function (err) {
	console.log(err.message);
	console.log(err.stack);
});

client.on("connect", function (e) {
	console.log("Redis is Connect: " + client.address.green + "");
});

module.exports = client;
