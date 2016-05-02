var ssl = ENV( "URL_SSL_SECURITY", false );
var host = ENV( "URL_HOST", "localhost" );
var port = ENV( "URL_PORT", 80 );
var path = ENV( "URL_PATHNAME", "/store/file" );
var URL = ENV( 'URL', false );
var url = require( "url" );

var generateURL = ( function generateURL( ssl, host, port, path, baseUrl, idfile, fileName, sufix ) {
	ssl = ssl.toString();
	if ( baseUrl == false ) {
		return url.format( {
			protocol: ( ssl === "auto" ) ? false : ( ssl.toLowerCase() == "true" ) ? "https" : "http",
			hostname: host,
			port: ssl ? Number( port ) === 443 ? false : port : Number( port ) === 80 ? false : port,
			pathname: path + "/" + idfile + "/" + fileName + ( sufix ? "/" + sufix : "" ),
		} );
	} else {
		return url.resolve( baseUrl, path + "/" + idfile + "/" + fileName + ( sufix ? "/" + sufix : "" ) )
	}
} ).bind( null, ssl, host, port, path, URL )

module.exports = function( idfile, fileName ) {
	return generateURL( idfile, fileName );
};

module.exports.info = function( idfile, fileName ) {
	return generateURL( idfile, fileName, "info" );
};
