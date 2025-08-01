import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Question from './Question';
class Option extends Model {
}
Option.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'questions',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Option',
    tableName: 'options',
    timestamps: true,
});
Question.hasMany(Option, { foreignKey: 'questionId', as: 'options' });
Option.belongsTo(Question, { foreignKey: 'questionId' });
export default Option;
