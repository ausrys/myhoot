import { createServer } from 'node:http';
import { instrument } from '@socket.io/admin-ui';
import app from './app';
import sequelize from './config/database';
import './models/index';
import { initSocket } from './sockets';
import { setIO } from './sockets/socketInstance';
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Sync models (use { force: true } to reset tables)
        await sequelize.sync({ alter: true });
        console.log('📦 Models synced');
        // Create HTTP server from Express app
        const httpServer = createServer(app);

        // Init socket layer
        const io = initSocket(httpServer);
        setIO(io);
        instrument(io, {
            auth: false,
            mode: 'development',
        });
        httpServer.listen(PORT, () => {
            console.log(`🚀 Server listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();
