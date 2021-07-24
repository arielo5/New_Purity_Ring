const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model { };

Player.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        jersey_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        coach_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'coach',
                key: 'id'
            }
        },
        team_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'team',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'player',
    }
);

module.exports = Player;