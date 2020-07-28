module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			nickname: {
				type: DataTypes.String(20),
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.String(20),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.String(100),
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		},
	);
	User.associate = db => {
		// 게시글
		db.User.hasMany(db.Post);
		//댓글
		db.User.hasMany(db.Comment);
		// 게시글 좋아요
		db.User.belongsToMany(db.Post, { through: 'Like', as: 'LikedPosts' });
		// 게시글 Star
		db.User.belongsToMany(db.Post, { through: 'Star', as: 'StaredPosts' });
		// 팔로우 팔로잉
		db.User.belongsToMany(db.User, {
			through: 'Follow',
			as: 'Followers',
			foreignKey: 'FollowingId',
		});
		db.User.belongsToMany(db.User, {
			through: 'Follow',
			as: 'Followigs',
			foreignKey: 'FollowerId',
		});
	};
	return User;
};
