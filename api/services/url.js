
var ssl = false;
var host = "localhost";
var port = 80;
var path = "/store/file";

module.exports = function (idfile, fileName) {
	return ( ssl ? "https": "http") + "://" + host + ((port == 80) ? "" : ":" + port) + path + "/" + idfile + "/" + fileName;
};

module.exports.info = function (idfile, fileName) {
	return ( ssl ? "https": "http") + "://" + host + ((port == 80) ? "" : ":" + port) + path + "/" + idfile + "/" + fileName + "/info";
};
