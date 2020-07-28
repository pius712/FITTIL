const { NOT_LOGGED_IN, LOGGED_IN } = require('../actions');
exports.isLoggedIn = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.status(401).send(NOT_LOGGED_IN);
	}
};
exports.isNotLoggedIn = (req, res, next) => {
	if (!req.user) {
		next();
	} else {
		res.status(401).send(LOGGED_IN);
	}
};
