// models/GameUser.ts
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from '../config/database';
import GameSession from './GameSession';

class GameUser extends Model<InferAttributes<GameUser>, InferCreationAttributes<GameUser>> {
    declare id: CreationOptional<number>;
    declare sessionId: string;
    declare username: string;
    declare score: number;
    declare joinedAt?: Date;
}

GameUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sessionId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        joinedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'GameUser',
        tableName: 'game_users',
    },
);

// Association
GameUser.belongsTo(GameSession, { foreignKey: 'sessionId', as: 'session' });
GameSession.hasMany(GameUser, { foreignKey: 'sessionId', as: 'players' });

export default GameUser;
