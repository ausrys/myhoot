import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';
import { TestRoutes, TestQuizEndpoints, TestQuestionEndpoints } from './types';
import { CreateQuestionInput } from '../src/validators/question.validator';
beforeAll(async () => {
    await sequelize.sync({ force: true });
    await request(app)
        .post(`${TestRoutes.ROOT}${TestRoutes.QUIZ}${TestQuizEndpoints.CREATE}`)
        .send({
            title: 'Test Quiz',
            description: 'Test Description',
            isPublic: true,
        });
});

afterAll(async () => {
    await sequelize.close();
});
describe(`POST ${TestRoutes.ROOT}${TestRoutes.QUESTION}${TestQuestionEndpoints.CREATE}`, () => {
    it('should check if it creates a question', async () => {
        const res = await request(app)
            .post(`${TestRoutes.ROOT}${TestRoutes.QUESTION}${TestQuestionEndpoints.CREATE}`)
            .send({
                text: 'Which of the following are programming languages?',
                quizId: 1,
                options: ['Python', 'HTML', 'JavaScript', 'CSS'],
                correctOptions: [0, 2],
            } as CreateQuestionInput);
        expect(res.statusCode).toBe(201);
        expect(res.body.question).toHaveProperty('quizId');
        expect(res.body.question.quizId).toBe(1);
        expect(res.body.options.length).toBe(4);
        expect(res.body.options[0].isCorrect).toBe(true);
        expect(res.body.options[1].isCorrect).toBe(false);
        expect(res.body.options[2].isCorrect).toBe(true);
    });
    it('should fail for missing arguments', async () => {
        const res = await request(app)
            .post(`${TestRoutes.ROOT}${TestRoutes.QUESTION}${TestQuestionEndpoints.CREATE}`)
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.text).toBe('Question must be provided!');
        expect(res.body.quizId).toBe('Quiz id must be provided!');
        expect(res.body.options).toBe('Options must be provided!');
        expect(res.body.correctOptions).toBe('Correct options must be provided!');
    });
    it('should fail for wrong argument types', async () => {
        const res = await request(app)
            .post(`${TestRoutes.ROOT}${TestRoutes.QUESTION}${TestQuestionEndpoints.CREATE}`)
            .send({
                text: 1,
                quizId: '1',
                timeLimit: '10',
                options: {},
                correctOptions: {},
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.text).toBe('Question must be a string');
        expect(res.body.quizId).toBe('Quiz must be an number!');
        expect(res.body.options).toBe('Options must be a list!');
        expect(res.body.correctOptions).toBe('Correct options must be a list!');
    });
});
