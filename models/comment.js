const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

Comment.init (
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
    modelName: 'Comment',
}
)

module.exports = Comment;