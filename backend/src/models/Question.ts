import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from '../config/database';
import Quiz from './Quiz';

class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
    declare id: CreationOptional<number>;
    declare text: string;
    declare timeLimit: number;
    declare quizId: number;
}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        timeLimit: {
            type: DataTypes.INTEGER,
            defaultValue: 30, // seconds
        },
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quizzes',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Question',
        tableName: 'questions',
        timestamps: true,
    },
);

Quiz.hasMany(Question, { foreignKey: 'quizId', as: 'questions' });
Question.belongsTo(Quiz, { foreignKey: 'quizId' });

export default Question;
