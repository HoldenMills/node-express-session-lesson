var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.use(function(req, res, next) {
		if(req.session && !req.session.currRequestRoute) {
			req.session.currRequestRoute = req.path;
		} else {
			req.session &&
				(function sessionSetterIIFE() {
					req.session.lastRequestRoute = req.session.currRequestRoute;
					req.session.currRequestRoute = req.path;
				})();
		}

		next();
	});*/

router.route('/').
	get(function(req, res, next) {
		res.json(req.session);
	});

router.route('/doStuff').
	get(function(req, res, next) {
		res.json(req.session.lastPutDate || '');
	}).put(function(req, res, next) {
		req.session.lastPutDate = (new Date(Date.now())).toString();
		res.sendStatus(201);
	}).patch(function(req, res, next){
		try {
			if(!req.session.lastPutDate) throw new Error("No date!");
			var date = new Date(req.session.lastPutDate);
			date.setYear(date.getFullYear() + 10);
			req.session.lastPutDate = date.toString();
		} catch(e) {
			return next(e);
		}
		req.session.save(function(err) {
			if(err) return next(err);
			res.sendStatus(200);
		});
	}).delete(function(req, res, next) {
		delete req.session.lastPutDate;
		res.sendStatus(204);
	}).all(function(err, req, res, next) {
		res.status(500).
			json({
				error : {
					name : err.name,
					message : err.message
				}
			});
	});

module.exports = router;

