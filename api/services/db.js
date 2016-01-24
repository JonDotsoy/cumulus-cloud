
var redis = require("./redis");

var prefix = "a"

module.exports = {
	"keys": redis.keys.bind(redis, prefix + '*'),
}
