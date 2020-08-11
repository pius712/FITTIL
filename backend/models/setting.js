const { SHOWN_AS_CARD } = require('../actions');
module.exports = (sequelize, DataTypes) => {
	const Setting = sequelize.define(
		'Setting',
		{
			way_to_show: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: SHOWN_AS_CARD,
			},
		},
		{ charset: 'utf8', collate: 'utf8_general_ci' },
	);
	Setting.associate = db => {
		db.Setting.hasOne(db.User);
	};
	return Setting;
};
