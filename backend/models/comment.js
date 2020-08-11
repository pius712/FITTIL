module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		'Comment',
		{
			content: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
		},
		{
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci',
		},
	);
	Comment.associate = db => {
		// 댓글 유저
		db.Comment.belongsTo(db.User);
		// 댓글 게시글
		db.Comment.belongsTo(db.Note);
	};
	return Comment;
};
