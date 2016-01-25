
var express = require("express");
var bodyParser = require("body-parser");
var Url = require("../services/url");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var Store = require("../services/store");
var uuid = require("uuid");
var multer = require("multer");
var upload = multer({ dest: path.resolve(__dirname, "..", "..", "store") });
var _ = require("lodash");
var url = require("url");
var urlencode = require("urlencode");
var gm = require("gm");


router.get("/", function (req, res) {
	res.send([
		"Help api:",
		"\tlist",
		"\t\t\tShow all files",
	].map(function (e) {return "<div>"+e.replace(/\t/g,"&nbsp;".repeat(4))+"</div>"}).join("\n"));
});


// router.get("/list", function (req, res) {
// 	Store.list().then(function (list) {
// 		res.json(list);
// 	}).catch(function (err) {
// 		res.json(err);
// 	});
// });


router.get("/size", function (req, res) {
	Store.dbsize().then(function (size) {
		res.json(size);
	}).catch(function (err) {
		res.json(err);
	});
});

router.post("/upload", upload.any(), function (req, res, next) {
	if (req.files) {
		Promise.all(req.files.map(function (file) {
			console.log(url.format(file.originalname));
			file.originalname = urlencode.decode(file.originalname).replace(/[^a-z0-9\.\-]/i, "-");
			file.created = new Date();

			if (file.mimetype.search(/^image/i) == 0) {
				return new Promise(function (resolve, reject) {
					gm(file.path)
					.size(function (err, size) {
						if (err) {
							reject(err);
						} else {
							file.sizeImage = size;
							Store.define(file)
							.then(resolve)
							.catch(reject);
						}
					});
				});
			} else {
				return Store.define(file);
			}
		}))
		.then(function (id) {
			res.send(id);
		})
		.catch(function (err) {
			console.log(err.stack);
			next();
		});
	} else {
		next();
	}

});

router.get("/file/:idfile/:name?/info", function (req, res, next) {
	var idfile = req.params.idfile;
	Store.info(idfile).then(function (data) {
		if (data) {
			if (req.params.name != data.originalname) {
				res.redirect(data.url_info);
			}

			res.json({
				id: data.id,
				url: data.url,
				url_info: data.url_info,
				mimetype: data.mimetype,
				size: data.size,
				sizeImage: data.sizeImage,
				created: data.created,
			});
		} else {
			next()
			// res.status(404).end("404 No Found.");
		}
	})
	.catch(function (err) {
		console.log(err.stack);
		// res.json({error: err.message, stack:err.stack});
		next();
	})
});

router.get("/file/:idfile/:name?", function (req, res, next) {
	var idfile = req.params.idfile;
	Store.info(idfile).then(function (data) {
		
		if (data) {
			if (req.params.name != data.originalname) {
				res.redirect(data.url);
			}

			res.set('Content-Type', data.mimetype);
			res.sendFile(data.path, {
				maxAge: 31536000000,
				lastModified: false,
			});
		} else {
			// res.status(404).end("404 No Found.");
			next();
		}

	})
	.catch(function (err) {
		console.log(err.stack);
		// res.json(err);
		next();
	});
});


module.exports = router;
