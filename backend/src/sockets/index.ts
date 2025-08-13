import { Server as SocketIOServer } from 'socket.io';
import { registerGameEvents } from './gameEvents';
import { registerPlayerEvents } from './playerEvents';

export const initSocket = (httpServer: any) => {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: '*', // TODO: restrict in production
        },
    });

    io.on('connection', (socket) => {
        console.log(`🔌 Client connected: ${socket.id}`);

        // Register event handlers
        registerGameEvents(io, socket);
        registerPlayerEvents(io, socket);

        socket.on('disconnect', () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });
    });

    return io;
};
