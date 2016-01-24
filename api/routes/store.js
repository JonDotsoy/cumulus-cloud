
var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var Store = require("../services/store");
var uuid = require("uuid");
var multer = require("multer");
var upload = multer({ dest: path.resolve(__dirname, "..", "..", "store") });


router.get("/", function (req, res) {
	res.send([
		"Help api:",
		"\tlist",
		"\t\t\tShow all files",
	].map(function (e) {return "<div>"+e.replace(/\t/g,"&nbsp;".repeat(4))+"</div>"}).join("\n"));
});


router.get("/list", function (req, res) {
	Store.list().then(function (list) {
		res.json(list);
	}).catch(function (err) {
		res.json(err);
	});
});


router.get("/size", function (req, res) {
	Store.dbsize().then(function (size) {
		res.json(size);
	}).catch(function (err) {
		res.json(err);
	});
});

router.post("/update", upload.any(), function (req, res) {
	// res.json({
	// 	ok: true,
	// 	file: req.file,
	// 	files: req.files,
	// 	body: req.body,
	// });
	if (req.files) {
		Store.define(req.files[0])
		.then(function (id) {
			res.send(id);
		});
	} else {
		res.status(404).end("404 No Found.");
	}
});

router.get("/file/:idfile/:name/info", function (req, res) {
	var idfile = req.params.idfile;
	Store.info(idfile).then(function (data) {
		if (data) {
			if (req.params.name != data.originalname) {
				res.redirect("http://localhost/store/file/d99d2e5a-aca9-4c42-8b4e-177f2ef488bf/" + data.originalname + "/info");
			}

			data.url = "http://localhost/store/file/d99d2e5a-aca9-4c42-8b4e-177f2ef488bf/" + data.originalname;

			res.json(data);
		} else {
			res.status(404).end("404 No Found.");
		}
	})
	.catch(function (err) {
		res.json(err);
	})
});

router.get("/file/:idfile/:name", function (req, res) {
	var idfile = req.params.idfile;
	Store.info(idfile).then(function (data) {
		if (data) {
			if (req.params.name != data.originalname) {
				res.redirect("http://localhost/store/file/d99d2e5a-aca9-4c42-8b4e-177f2ef488bf/" + data.originalname);
			}

			res.set('Content-Type', data.mimetype);
			res.sendFile(data.path);
			// res.json(data);
		} else {
			res.status(404).end("404 No Found.");
		}
	})
	.catch(function (err) {
		res.json(err);
	})
});


module.exports = router;
