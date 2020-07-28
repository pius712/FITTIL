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
					const exUser = User.findeOne({
						where: {
							[Op.or]: {
								email: id,
								nickname: id,
							},
						},
					});
					if (!exUser) {
						return done(null, false, { reason: CHECK_OUT_LOGIN_INFO });
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
