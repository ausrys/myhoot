import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Quiz from './Quiz';

class GameSession extends Model {
    declare id: number;
    declare quizId: number;
    declare status: 'waiting' | 'in_progress' | 'finished';
    declare endTime?: Date;
}
GameSession.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('waiting', 'in_progress', 'finished'),
            defaultValue: 'waiting',
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'GameSession',
        tableName: 'game_sessions',
    },
);
GameSession.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' });
Quiz.hasMany(GameSession, { foreignKey: 'quizId', as: 'sessions' });

export default GameSession;
