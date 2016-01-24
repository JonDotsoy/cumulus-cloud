
var redis = require("./redis");
var toPromise = require("../lib/PromiseByCallback");
var uuid = require("uuid");
var Url = require("./url");

var prefix = "store-";

var store = {
	"list": function () {
		return toPromise(redis.keys.bind(redis, prefix + '*'))()
		.then(function (list) {
			var antiPrefix = new RegExp("^" + prefix);
			return list.map(function (item) {
				return item.replace(antiPrefix, '');
			});
		});
	},
	"dbsize": toPromise(redis.dbsize.bind(redis)),
	"has": toPromise(redis.exists.bind(redis)),
	"define": function (data) {
		return toPromise(redis.setnx.bind(redis))(prefix + data.filename, JSON.stringify(data))
		.then(function (confirm) {
			return data.filename;
		});
	},
	"info": function (id) {
		return toPromise(redis.get.bind(redis))(prefix + id).then(function (info) {
			info = JSON.parse(info);
			info.url = Url(id, info.originalname);
			info.url_info = Url.info(id, info.originalname);
			info.id = id;
			return info;
		})
	},
};

module.exports = store;
