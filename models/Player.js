const { Model, DataTypes, STRING } = require('sequelize');
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
            allowNull: true,
            validate: {
                isNumeric: true,
            },
        },
        fav_team: {
            type: DataTypes.STRING, 
        },

        fav_player: {
            type: DataTypes.STRING,
        },

        goals: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        assists: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        penalty_minutes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
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