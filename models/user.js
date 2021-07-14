const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/sql_connection');

class User extends Model {
	checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password);
	}
}

User.init(
{
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
    sign_in_with_apple_unique_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apple_music_auth_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spotify_user_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spotify_auth_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
	user_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true,
	},
},
{
	hooks: {
		beforeCreate: async (newUserData) => {
			newUserData.password = await bcrypt.hash(newUserData.password, 10);
			return newUserData;
		},
	 	beforeUpdate: async (updatedUserData) => {
			updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
			return updatedUserData;
	 	},
	},
	sequelize,
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	modelName: 'user',
}
);

module.exports = User;