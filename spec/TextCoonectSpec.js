
var path = require("path");
var redis;
var client;
var configRedis;

describe('Redis', function() {
	describe('is redired', function () {
		it("'redis'", function () {
			redis = require("redis");
		});
		it('configs', function () {
			configRedis = require(path.resolve(__dirname, "..", "config", "dbConnect")).redis;
		});
	});
	it('is connect', function (done) {
		client = redis.createClient(configRedis);
		client.on("error", function (err) {
			done(err);
		});
		client.on("connect", function () {
			done();
		})
	});
	it('is disconnect', function () {
		client.quit();
	});
});
