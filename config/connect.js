
module.exports = {
	redis: {
		// 192.168.99.100
		host: ENV("REDIS_DB", "db"),
		// 16379
		port: ENV("REDIS_PORT", 6379),
	},
};
