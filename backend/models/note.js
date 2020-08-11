module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define(
		'Note',
		{
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			level: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			public_availability: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
		},
		{
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci',
		},
	);
	Note.associate = db => {
		db.Note.belongsTo(db.User);
		// db.Note.hasMany(db.Comment);
		// db.Note.hasMany(db.Image);
		db.Note.belongsToMany(db.MuscleArea, { through: 'NoteMuscleArea' });
		// db.Note.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
		// 좋아요 게시글
		db.Note.belongsToMany(db.User, { through: 'Like', as: 'LikeUsers' });
		// 게시글 Star
		db.Note.belongsToMany(db.User, { through: 'Star', as: 'StarUsers' });
	};
	return Note;
};
