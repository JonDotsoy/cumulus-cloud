
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



module.exports = router;
