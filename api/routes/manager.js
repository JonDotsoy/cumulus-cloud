
var express = require("express");
var Store = require("../services/store");
var path = require("path");
var fs = require("fs");
var router = express.Router();



router.get("/list", function (req, res, next) {
	Store.list().then(function (list) {

		Promise.all(list.map(function (item) {
			return Store.info(item);
		}))
		.then(function (list) {
			res.json(list.map(function (item) {
				return item;
			}));
		})
		.catch(function (err) {
			res.json(err);
		});

	}).catch(function (err) {
		res.json(err);
	});
});


router.get("/file/:idfile/:name?/info", function (req, res, next) {
	var idfile = req.params.idfile;
	Store.info(idfile).then(function (data) {
		if (data) {
			if (req.params.name != data.originalname) {
				res.redirect(data.url_info);
			}

			res.json(data);
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


module.exports = router;
