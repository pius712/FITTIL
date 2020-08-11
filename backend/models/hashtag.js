module.exports = (sequelize, DataTypes) => {
	const Hashtag = sequelize.define(
		'Hashtag',
		{
			name: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
		},
		{
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci',
		},
	);
	Hashtag.associate = db => {
		// 게시글 해쉬태그
		db.Hashtag.belongsToMany(db.Note, { through: 'NoteHashtag' });
	};
	return Hashtag;
};
