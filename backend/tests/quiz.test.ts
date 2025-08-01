import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';
import { TestRoutes, TestQuizEndpoints } from './types';
beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe(`POST ${TestRoutes.ROOT}${TestRoutes.QUIZ}${TestQuizEndpoints.CREATE}`, () => {
    it('should create a quiz successfully', async () => {
        const res = await request(app)
            .post(`${TestRoutes.ROOT}${TestRoutes.QUIZ}${TestQuizEndpoints.CREATE}`)
            .send({
                title: 'Test Quiz',
                description: 'Test Description',
                isPublic: true,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test Quiz');
    });

    it('should return validation error for missing title', async () => {
        const res = await request(app)
            .post(`${TestRoutes.ROOT}${TestRoutes.QUIZ}${TestQuizEndpoints.CREATE}`)
            .send({
                description: 'Missing title',
                isPublic: false,
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('title');
        expect(res.body.title).toBe('Title must be provided!');
    });
    it('should return validation error for too short title', async () => {
        const res = await request(app)
            .post(`${TestRoutes.ROOT}${TestRoutes.QUIZ}${TestQuizEndpoints.CREATE}`)
            .send({
                title: '1111',
                description: 'Short title',
                isPublic: false,
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('title');
        expect(res.body.title).toBe('Title must be at least 5 symbols!');
    });
    it('should return validation error for wrong types of description and title', async () => {
        const res = await request(app)
            .post(`${TestRoutes.ROOT}${TestRoutes.QUIZ}${TestQuizEndpoints.CREATE}`)
            .send({
                title: 1111,
                description: 1,
                isPublic: false,
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('description');
        expect(res.body.title).toBe('Title must be a string');
        expect(res.body.description).toBe('Description must be a string!');
    });
    it('should return validation error for too long title', async () => {
        const res = await request(app)
            .post(`${TestRoutes.ROOT}${TestRoutes.QUIZ}${TestQuizEndpoints.CREATE}`)
            .send({
                title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                description: 'Long title title',
                isPublic: false,
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('title');
        expect(res.body.title).toBe('Title cannot be longer than 30 symbols!');
    });
});

describe(`GET ${TestRoutes.ROOT}${TestRoutes.QUIZ}${TestQuizEndpoints.ALL}`, () => {
    it('should check it returns an array with one entry', async () => {
        const res = await request(app).get(
            `${TestRoutes.ROOT}${TestRoutes.QUIZ}${TestQuizEndpoints.ALL}`,
        );
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe(typeof Array);
        expect(res.body.length).toEqual(typeof Array);
    });
});
