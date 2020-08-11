module.exports = (sequelize, DataTypes) => {
	const MuscleArea = sequelize.define(
		'MuscleArea',
		{
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{ charset: 'utf8mb4', collate: 'utf8mb4_general_ci' },
	);
	MuscleArea.associate = db => {
		db.MuscleArea.belongsToMany(db.Note, { through: 'NoteMuscleArea' });
	};
	return MuscleArea;
};
