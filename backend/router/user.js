const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const { USER_EXIST, NOT_FOUND_USER, LOGOUT_SUCCESS } = require('../actions');
const router = express.Router();
const { Op } = require('sequelize');
const passport = require('passport');

// post /user/singup 회원가입
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
	try {
		const exUser = User.findOne({ where: { id: req.body.email } });
		if (exUser) {
			return res.status(403).send(USER_EXIST);
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = await User.Create({
			nickname: req.body.nickname,
			email: req.body.email,
			password: hashedPassword,
		});
		delete user.password;
		res.json(user);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

// POST /user/login 로그인
router.post('/login', isNotLoggedIn, async (req, res, next) => {
	try {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				console.error(err);
				next(err);
			}
			if (info) {
				return res.status(401).send(info.reason);
			}
			return req.login(user, async err => {
				if (err) {
					console.error(err);
					next(err);
				}
				return res.json(user);
			});
		})(req, res, next);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

//  POST /user/logout 로그아웃
router.post('/logout', async (req, res, next) => {
	try {
		req.logout();
		req.session.destroy();
		return res.send(LOGOUT_SUCCESS);
	} catch (err) {
		console.error(err);
		next(err);
	}
});
module.exports = router;
