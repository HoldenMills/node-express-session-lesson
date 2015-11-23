var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/main');

/* GET home page. */
/*router.use(ctrl.root.middleware[0]);*/

router.route('/').
	get(ctrl.root.get);

router.route('/doStuff').
	get(ctrl.doStuff.get).
	put(ctrl.doStuff.put).
	patch(ctrl.doStuff.patch).
	delete(ctrl.doStuff.delete).
	all(ctrl.doStuff.default);

module.exports = router;

