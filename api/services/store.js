
var redis = require("./redis");
var toPromise = require("../lib/PromiseByCallback");
var uuid = require("uuid");

var prefix = "store-";

var store = {
	"list": toPromise(redis.keys.bind(redis, prefix + '*')),
	"dbsize": toPromise(redis.dbsize.bind(redis)),
	"has": toPromise(redis.exists.bind(redis)),
	"define": function (data) {
		var id = uuid();
		return toPromise(redis.setnx.bind(redis))(prefix + id, JSON.stringify(data))
		.then(function (confirm) {
			return id;
		});
	},
	"info": function (id) {
		return toPromise(redis.get.bind(redis))(prefix + id).then(function (info) {
			return JSON.parse(info);
		})
	},
};

module.exports = store;
