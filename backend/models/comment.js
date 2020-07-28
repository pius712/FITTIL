module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		'Comment',
		{
			content: {
				type: DataTypes.String(200),
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8mb_general_ci',
		},
	);
	Comment.associate = db => {
		// 댓글 유저
		db.Comment.belongsTo(db.User);
		// 댓글 게시글
		db.Comment.belongsTo(db.Post);
	};
	return Comment;
};
