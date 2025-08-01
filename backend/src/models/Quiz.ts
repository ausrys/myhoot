import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Quiz extends Model {
    declare id: number;
    declare title: string;
    declare description: string;
    declare isPublic: boolean;
}

Quiz.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'Quiz',
        tableName: 'quizzes',
        timestamps: true,
    },
);

export default Quiz;
