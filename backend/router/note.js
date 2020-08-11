const express = require('express');
const { User, Note, MuscleArea } = require('../models');
const router = express.Router();
const { isLoggedIn } = require('./middleware');
const { Op } = require('sequelize');
const {
	NOT_FOUND_POST,
	NOT_AVAILABLE_ACCESS,
	NOT_FOUND_USER,
} = require('../actions');
// 노트 작성
router.post('/', isLoggedIn, async (req, res, next) => {
	try {
		const part = req.body.part;
		const note = await Note.create({
			title: req.body.title,
			content: req.body.content,
			level: req.body.level,
			public_availability: req.body.public_availability,
			UserId: req.user.id,
		});
		if (part) {
			const results = await Promise.all(
				part.map(item => MuscleArea.findOrCreate({ where: { name: item } })),
			);
			await note.addMuscleAreas(results.map(result => result[0]));
		}
		const FullNote = await Note.findOne({
			where: {
				id: note.id,
			},
			include: [
				{
					model: MuscleArea,
				},
				{
					model: User,
					attributes: ['id', 'nickname'],
				},
			],
		});
		return res.json(FullNote);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

// 노트 리스트 가져오기
router.get('/list', isLoggedIn, async (req, res, next) => {
	try {
		// if 내 아이디 일때, else 내 아이디 아닐때 req.user.id
		// req.query.userId == 내 아이디  rqe.query.targetname == 다른 사람 닉네임
		// console.log('params.userId', req.query);

		const exUser = await User.findOne({
			where: {
				nickname: req.query.targetname,
			},
		});
		let offset = 0;
		if (parseInt(req.query.lastId) > 1) {
			offset = (parseInt(req.query.lastId) - 1) * 10;
		}
		// 라우터 접근시, 해당 유저 X
		if (!exUser) {
			return res.status(403).send(NOT_FOUND_USER);
		}
		// 나의 note 불러오기
		if (req.user.id === exUser.id) {
			const notes = await Note.findAll({
				limit: parseInt(req.query.limit),
				order: [['createdAt', 'DESC']],
				offset,
				include: [
					{
						model: MuscleArea,
					},
					{
						model: User,
						where: {
							id: req.user.id,
							nickname: exUser.nickname,
						},
						attributes: ['id', 'nickname'],
					},
				],
			});
			return res.json(notes);
		} else {
			// 타인 노트 가져오기
			const notes = await Note.findAll({
				where: {
					public_availability: 'public',
				},
				offset,
				limit: parseInt(req.query.limit),
				order: [['createdAt', 'DESC']],
				include: [
					{
						model: MuscleArea,
					},
					{
						model: User,
						attributes: ['id', 'nickname'],
						where: {
							id: exUser.id,
							nickname: exUser.nickname,
						},
					},
				],
			});
			console.log('outernotes', notes);
			return res.json(notes);
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
});
// 노트 길이 불러오기
router.get('/length/:targetname', isLoggedIn, async (req, res, next) => {
	try {
		const { count, rows } = await Note.findAndCountAll({
			include: [
				{
					model: User,
					where: {
						nickname: req.params.targetname,
					},
				},
			],
		});
		res.status(200).json({ count });
	} catch (err) {
		console.error(err);
		next(err);
	}
});
// 노트 수정
router.patch('/edit', isLoggedIn, async (req, res, next) => {
	try {
		const part = req.body.part;
		const note = await Note.findOne({
			where: {
				id: req.body.noteId,
			},
		});
		if (!note) {
			return res.status(403).send(NOT_FOUND_POST);
		}
		if (note.UserId !== req.user.id) {
			return res.status(403).send(NOT_AVAILABLE_ACCESS);
		}
		note.title = req.body.title;
		note.content = req.body.title;
		note.level = req.body.level;
		note.public_availability = req.body.public_availability;
		await note.save();
		if (part) {
			const results = await Promise.all(
				part.map(item => MuscleArea.findOrCreate({ where: { name: item } })),
			);
			await note.addMuscleAreas(results.map(result => result[0]));
		}
		const fullNote = await Note.findOne({
			where: note.id,
			include: [
				{
					model: MuscleArea,
				},
				{
					model: User,
					attributes: ['id', 'nickname'],
				},
			],
		});
		return res.json(fullNote);
	} catch (err) {
		console.error(err);
		next(err);
	}
});
// 노트 삭제
router.delete('/:noteId', isLoggedIn, async (req, res, next) => {
	try {
		const note = await Note.findOne({
			where: {
				id: req.params.noteId,
			},
		});
		if (!note) {
			return res.status(403).send(NOT_FOUND_POST);
		}
		if (note.UserId !== req.user.id) {
			return res.status(403).send(NOT_AVAILABLE_ACCESS);
		}
		await Note.destroy({
			where: {
				id: req.params.noteId,
				UserId: req.user.id,
			},
		});
		res.json({ noteId: parseInt(req.params.noteId) });
	} catch (err) {
		console.log(err);
		next(err);
	}
});
// 게시글 하나 가져오기
// router.get('/:postId', async (req, res, next) => {
// 	try {
// 	} catch (err) {
// 		console.error(err);
// 		next(err);
// 	}
// });
module.exports = router;
