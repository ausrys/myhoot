import { Server as SocketIOServer } from 'socket.io';
import { registerGameEvents } from './gameEvents';
import { registerPlayerEvents } from './playerEvents';

export const initSocket = (httpServer: any) => {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: '*',
            credentials: true,
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`🔌 Client connected: ${socket.id}`);

        // Register event handlers
        registerGameEvents(io, socket);
        registerPlayerEvents(io, socket);
    });

    return io;
};
