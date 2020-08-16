const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { Op } = require('sequelize');
const { CHECK_OUT_LOGIN_INFO } = require('../actions');
module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'id',
				passwordField: 'password',
			},
			async (id, password, done) => {
				try {
					const exUser = await User.findOne({
						where: {
							[Op.or]: [{ email: id }, { nickname: id }],
							verified: true,
						},
					});
					if (!exUser) {
						// return done(null, false, { reason: CHECK_OUT_LOGIN_INFO });
						return done(null, false, { reason: '유저없음' });
					}
					const result = await bcrypt.compare(password, exUser.password);
					if (result) {
						return done(null, exUser);
					} else {
						return done(null, false, { reason: CHECK_OUT_LOGIN_INFO });
					}
				} catch (err) {
					console.error(err);
					return done(err);
				}
			},
		),
	);
};
