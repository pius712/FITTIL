module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			nickname: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			note: {
				type: DataTypes.STRING(100),
			},
			job: {
				type: DataTypes.STRING(100),
			},
			location: {
				type: DataTypes.STRING(100),
			},
			facebook: {
				type: DataTypes.STRING(100),
			},
			instagram: {
				type: DataTypes.STRING(100),
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		},
	);
	User.associate = db => {
		// 게시글
		db.User.hasMany(db.Note);
		//댓글
		// db.User.hasMany(db.Comment);
		// 게시글 좋아요
		// db.User.belongsToMany(db.Note, { through: 'Like', as: 'LikedNotes' });
		// 게시글 Star
		// db.User.belongsToMany(db.Note, { through: 'Star', as: 'StaredNotes' });

		// 팔로우 팔로잉
		db.User.belongsToMany(db.User, {
			through: 'Follow',
			as: 'Followers',
			foreignKey: 'FollowingId',
		});
		db.User.belongsToMany(db.User, {
			through: 'Follow',
			as: 'Followings',
			foreignKey: 'FollowerId',
		});
		db.User.belongsTo(db.Setting);
	};
	return User;
};
