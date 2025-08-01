import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index';
dotenv.config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
// Routes
app.get('/health', (_, res) => {
    res.send('Server is up!');
});
export default app;
