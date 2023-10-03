const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {

}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {

        },
        body: {

        },
        whenCreated: {
            type: sequelize.DATE,
            allowNull: true,
            defaultValue: sequelize.NOW,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post',
    }
);

module.exports = Post;