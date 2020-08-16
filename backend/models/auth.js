module.exports = (sequelize, DataTypes) => {
	const Auth = sequelize.define(
		'Auth',
		{
			token: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			userId: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			ttl: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci',
		},
	);
	return Auth;
};
