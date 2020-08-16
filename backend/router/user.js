const express = require('express');
const bcrypt = require('bcrypt');
const { User, Note, Image, Comment, Setting } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const { USER_EXIST, NOT_FOUND_USER, LOGOUT_SUCCESS } = require('../actions');
const router = express.Router();
const { Op } = require('sequelize');
const passport = require('passport');
const { transport, mailOptions, generateKey } = require('../utils/mailer');
// GET /user 내 정보가져오기
router.get('/', isLoggedIn, async (req, res, next) => {
	try {
		// console.log('req.user', req.user);
		const user = await User.findOne({
			where: {
				id: req.user.id,
				verified: true,
			},
			attributes: {
				exclude: ['password'],
			},
			include: [
				{
					model: User,
					as: 'Followings',
					attributes: ['id'],
				},
				{
					model: User,
					as: 'Followers',
					attributes: ['id'],
				},
				{
					model: Setting,
				},
			],
			// include: [
			// 	{
			// 		model: Note,
			// 	},
			// {
			// 	model: Note,
			// 	as: 'StaredNotes',
			// 	attributes: ['id'],
			// },
			// {
			// 	model: User,
			// 	as: 'Followers',
			// 	attributes: ['id'],
			// },
			// {
			// 	model: User,
			// 	as: 'Followers',
			// 	attributes: ['id'],
			// },
			// ],
		});
		// console.log(user)''
		return res.json(user);
	} catch (err) {
		console.error(err);
		next(err);
	}
});
// Note /user/singup 회원가입
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
	try {
		const exUser = await User.findOne({
			where: {
				[Op.or]: [{ email: req.body.email }, { nickname: req.body.nickname }],
			},
		});
		if (exUser && exUser.verified === true) {
			return res.status(403).send(USER_EXIST);
		}

		// 이메일 인증 코드

		// 이메일 전송
		const key = generateKey(req.body.email);
		const options = mailOptions(req.body.email, key);
		transport.sendMail(options, (err, info) => {
			if (err) {
				console.log(err);
			}
			console.log(info);
			// console.log(info.messageId);
		});

		//
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		if (!exUser) {
			await User.create({
				nickname: req.body.nickname,
				email: req.body.email,
				password: hashedPassword,
				key_for_verify: key,
			});
		}

		const pendingUser = await User.findOne({
			where: {
				email: req.body.email,
			},
			attributes: ['id', 'email', 'nickname'],
		});
		res.json(pendingUser);
		// 로그인8
		// req.body.id = req.body.nickname;
		// passport.authenticate('local', (err, user, info) => {
		// 	if (err) {
		// 		console.error(err);
		// 		next(err);
		// 	}
		// 	if (info) {
		// 		return res.status(401).send(info.reason);
		// 	}
		// 	return req.login(user, async err => {
		// 		if (err) {
		// 			console.error(err);
		// 			next(err);
		// 		}
		// 		const userWithoutPassword = await User.findOne({
		// 			where: {
		// 				id: user.id,
		// 			},
		// 			attributes: {
		// 				exclude: ['password'],
		// 			},
		// 			include: [
		// 				{
		// 					model: User,
		// 					as: 'Followings',
		// 					attributes: ['id'],
		// 				},
		// 				{
		// 					model: User,
		// 					as: 'Followers',
		// 					attributes: ['id'],
		// 				},
		// 				{
		// 					model: Setting,
		// 				},
		// 			],
		// 		});
		// 		return res.json(userWithoutPassword);
		// 	});
		// })(req, res, next);
	} catch (err) {
		console.error(err);
		next(err);
	}
});
router.get('/pending/:nickname', async (req, res, next) => {
	try {
		const pendingUser = await User.findOne({
			where: {
				nickname: req.params.nickname,
				verified: false,
			},
			attributes: ['id', 'nickname', 'email'],
		});
		if (!pendingUser) {
			console.log('pendingUser 없음');
			return res.status(403).send(NOT_FOUND_USER);
		}
		return res.json(pendingUser);
	} catch (err) {
		console.error(err);
		next(err);
	}
});
// Note /user/login 로그인
router.post('/login', isNotLoggedIn, async (req, res, next) => {
	try {
		// console.log(req.body);
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				console.error(err);
				next(err);
			}
			if (info) {
				return res.status(401).send(info.reason);
			}
			return req.login(user, async err => {
				try {
					if (err) {
						console.error(err);
						next(err);
					}
					const userWithoutPassword = await User.findOne({
						where: {
							id: user.id,
						},
						attributes: {
							exclude: ['password'],
						},
						include: [
							{
								model: User,
								as: 'Followings',
								attributes: ['id'],
							},
							{
								model: User,
								as: 'Followers',
								attributes: ['id'],
							},
							{
								model: Setting,
							},
						],
					});
					return res.json(userWithoutPassword);
				} catch (error) {
					console.error(error);
				}
			});
		})(req, res, next);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

//  Note /user/logout 로그아웃
router.post('/logout', isLoggedIn, async (req, res, next) => {
	try {
		req.logout();
		req.session.destroy();
		return res.send(LOGOUT_SUCCESS);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

// Patch /user/edit/profile 내 프로필 수정하기
router.patch('/edit/profile', isLoggedIn, async (req, res, next) => {
	try {
		await User.update(
			{
				note: req.body.userNote,
				job: req.body.jobInfo,
				location: req.body.locationInfo,
				facebook: req.body.facebookInfo,
				instagram: req.body.instagramInfo,
			},
			{ where: { id: req.user.id } },
		);
		const user = await User.findOne({
			where: {
				id: req.user.id,
			},
			include: [
				{
					model: User,
					as: 'Followings',
					attributes: ['id'],
				},
				{
					model: User,
					as: 'Followers',
					attributes: ['id'],
				},
				{
					model: Setting,
				},
			],
		});

		// console.log(user);
		res.json(user);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

// 유저 검색
router.get('/search', isLoggedIn, async (req, res, next) => {
	try {
		console.log('query usename', req.query.username);
		let offset = 0;
		if (parseInt(req.query.page) > 1) {
			offset = (parseInt(req.query.page) - 1) * 10;
		}
		const users = await User.findAll({
			where: {
				nickname: {
					[Op.like]: `%${req.query.username}%`,
				},
				verified: true,
			},
			attributes: ['id', 'nickname', 'note'],
			offset,
			limit: 10,
		});
		if (!users) {
			return res.status(404).send('유저없어요');
		} else {
			console.log(users);
			return res.json(users);
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
});
// 검색한 유저의 총 수
router.get('/length/serach/:username', async (req, res, next) => {
	try {
		const { count, rows } = await User.findAndCountAll({
			where: {
				nickname: {
					[Op.like]: `%${req.query.username}%`,
				},
				verified: true,
			},
		});
		res.status(200).json({ count });
	} catch (err) {
		console.log(err);
		next(err);
	}
});
// 검색한 유저(targetUser)에 대한 정보
router.get('/:targetname', isLoggedIn, async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				nickname: req.params.targetname,
				verified: true,
			},
			attributes: {
				exclude: ['password'],
			},
			include: [
				{
					model: User,
					as: 'Followings',
					attributes: ['id'],
				},
				{
					model: User,
					as: 'Followers',
					attributes: ['id'],
				},
				{
					model: Setting,
				},
			],
		});
		if (!user) {
			res.status(403).send(NOT_FOUND_USER);
		} else {
			// console.log(user);
			res.json(user);
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
});
// 팔로우
router.patch('/:nickname/follow', isLoggedIn, async (req, res, next) => {
	try {
		const exUser = await User.findOne({
			where: {
				nickname: req.params.nickname,
				verified: true,
			},
		});
		if (!exUser) {
			return res.status(403).send(NOT_FOUND_USER);
		}
		// special methods의 인자는 인스턴스 혹은 primary key
		await exUser.addFollower(req.user.id);
		return res.json({
			followingId: exUser.id,
			followerId: req.user.id,
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
});
// 언팔로우
router.patch('/:nickname/unfollow', isLoggedIn, async (req, res, next) => {
	try {
		const exUser = await User.findOne({
			where: {
				nickname: req.params.nickname,
				verified: true,
			},
		});
		if (!exUser) {
			return res.status(403).send(NOT_FOUND_USER);
		}
		await exUser.removeFollower(req.user.id);
		return res.json({ followingId: exUser.id, followerId: req.user.id });
	} catch (err) {
		console.error(err);
		next(err);
	}
});
// 팔로워 리스트
router.get('/followers/list', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				nickname: req.query.username,
			},
		});
		if (!user) {
			return res.status(403).send(NOT_FOUND_USER);
		}
		let offset = 0;
		if (parseInt(req.query.page) > 1) {
			offset = (parseInt(req.query.page) - 1) * 10;
		}
		const followers = await user.getFollowers({
			attributes: ['id', 'nickname', 'note'],
			offset,
			limit: 30,
		});
		if (!followers) {
			return res.json(null);
		}
		return res.json(followers);
	} catch (err) {
		console.log(err);
		next(err);
	}
});
// 팔로잉 리스트
router.get('/followings/list', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				nickname: req.query.username,
			},
		});
		if (!user) {
			return res.status(403).send(NOT_FOUND_USER);
		}
		let offset = 0;
		if (parseInt(req.query.page) > 1) {
			offset = (parseInt(req.query.page) - 1) * 10;
		}
		const followings = await user.getFollowings({
			attributes: ['id', 'nickname', 'note'],
			offset,
			limit: 30,
		});
		if (!followings) {
			return res.json(followings);
		}
		return res.json(followings);
	} catch (err) {
		console.log(err);
		next(err);
	}
});
module.exports = router;
