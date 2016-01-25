
var ssl  = ENV("URL_SSL_SECURITY", false);
var host = ENV("URL_HOST", "localhost");
var port = ENV("URL_PORT", 80);
var path = ENV("URL_PATHNAME", "/store/file");
var url = require("url");

var generateURL = (function generateURL (ssl, host, port, path, idfile, fileName, sufix) {
	return url.format({
		protocol: (ssl === "auto") ? false : (ssl.toLowerCase() == "true") ? "https" : "http",
		hostname: host,
		port: ssl ? Number(port) === 443 ? false : port : Number(port) === 80 ? false : port,
		pathname: path + "/" + idfile + "/" + fileName + (sufix ? "/" + sufix : ""),
	});
}).bind(null, ssl, host, port, path)

module.exports = function (idfile, fileName) {
	return generateURL(idfile, fileName);
};

module.exports.info = function (idfile, fileName) {
	return generateURL(idfile, fileName, "info");
};
