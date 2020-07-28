module.exports = (sequelize, DataTypes) => {
	const Hashtag = sequelize.define(
		'Hashtag',
		{
			name: DataTypes.String(200),
			allowNull: false,
		},
		{
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci',
		},
	);
	Hashtag.associate = db => {
		// 게시글 해쉬태그
		db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
	};
	return Hashtag;
};
