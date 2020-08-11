const { Sequelize, DataTypes } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config,
);

const db = {};

db.User = require('./user')(sequelize, DataTypes);
db.Note = require('./note')(sequelize, DataTypes);
// db.Image = require('./image')(sequelize, DataTypes);
// db.Comment = require('./comment')(sequelize, DataTypes);
// db.Hashtag = require('./hashtag')(sequelize, DataTypes);
db.Setting = require('./setting')(sequelize, DataTypes);
db.MuscleArea = require('./musclearea')(sequelize, DataTypes);
Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
