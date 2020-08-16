const express = require('express');
const { User } = require('../models/index.js');
const { transport, mailOptions, generateKey } = require('../utils/mailer');
const { NOT_FOUND_USER, NOT_VERIFIED } = require('../actions/index.js');
const router = express.Router();

// 코드 인증
router.post('/', async (req, res, next) => {
	try {
		const key = req.body.code;
		const nickname = req.body.nickname;
		const pendingUser = await User.findOne({
			where: {
				nickname: nickname,
				key_for_verify: key,
			},
		});
		if (!pendingUser) {
			return res.status(403).send(NOT_VERIFIED);
		}
		pendingUser.verified = true;
		await pendingUser.save();
		const fullUserWithoutPassword = await User.findOne({
			where: {
				nickname: nickname,
			},
			attributes: {
				exclude: ['password'],
			},
		});
		res.json(fullUserWithoutPassword);
	} catch (err) {
		console.log(err);
		next(err);
	}
});
// 이메일 재전송
router.get('/email/:nickname', async (req, res, next) => {
	try {
		const pendingUser = await User.findOne({
			where: {
				nickname: req.params.nickname,
			},
		});
		if (!pendingUser) {
			return res.status(403).send(NOT_FOUND_USER);
		}
		const options = mailOptions(pendingUser.email);
		transport.sendMail(options, (err, info) => {
			if (err) {
				console.log(err);
			}
			console.log(info);
			console.log(info);
		});
		res.json(pendingUser);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

module.exports = router;
