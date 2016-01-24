
var ssl  = ENV("SSL_SECURITY", false);
var host = ENV("HOST", "localhost");
var port = ENV("PORT", 80);
var path = ENV("PATHNAME", "/store/file");
var url = require("url");

function generateURL (ssl, host, port, path, idfile, fileName, sufix) {
	return url.format({
		protocol: ssl === "auto" ? false : ssl ? "https" : "http",
		hostname: host,
		port: ssl ? port === 443 ? false : port : port === 80 ? false : port,
		pathname: path + "/" + idfile + "/" + fileName + (sufix ? "/" + sufix : ""),
	});
}

module.exports = function (idfile, fileName) {
	return generateURL(ssl, host, port, path, idfile, fileName);
};

module.exports.info = function (idfile, fileName) {
	return generateURL(ssl, host, port, path, idfile, fileName, "info");
};
