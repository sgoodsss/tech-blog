const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {

}

Comment.init (
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    whenCreated: {
        type: sequelize.DATE,
        allowNull: true,
        defaultValue: sequelize.NOW,
    },
    user_id: {
        //Foreign Key
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    post_id: {
        //Foreign Key
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id',
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
}
)

module.exports = Comment;