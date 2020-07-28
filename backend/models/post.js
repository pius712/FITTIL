module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		'Post',
		{
			content: {
				type: DataTypes.text,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8mb_general_ci',
		},
	);
	Post.associate = db => {
		db.Post.belongsTo(db.User);
		db.Post.hasnMany(db.Comment);
		db.Post.hasMany(db.Image);
		db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
		// 좋아요 게시글
		db.Post.belongsToMany(db.User, { through: 'Like', as: 'LikeUsers' });
		// 게시글 Star
		db.Post.belongsToMany(db.User, { through: 'Star', as: 'StarUsers' });
	};
	return Post;
};
