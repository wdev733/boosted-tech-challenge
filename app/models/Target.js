const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Target = sequelize.define('targets', {
	_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	id: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	consent_url: {
		type: DataTypes.STRING,
		allowNull: false
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	version: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
}, {
	createdAt: false,
	updatedAt: false,
});

module.exports = Target;