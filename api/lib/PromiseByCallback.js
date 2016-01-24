
// module.exports = function (cb) {
// 	return function (...args) {
// 		return new Promise(function (resolve, reject) {
// 			cb(...args, function (err, data) {
// 				if (err) {
// 					reject(err);
// 				} else {
// 					resolve(data);
// 				}
// 			});
// 		});
// 	}
// };

"use strict";

module.exports = function (cb) {
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return new Promise(function (resolve, reject) {
			cb.apply(undefined, args.concat([function (err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}]));
		});
	};
};