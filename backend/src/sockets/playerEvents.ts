import { Server, Socket } from 'socket.io';

export const registerPlayerEvents = (io: Server, socket: Socket) => {
    socket.on('leave_game', ({ gameId, nickname }) => {
        socket.leave(gameId);
        console.log(`👋 ${nickname} left game ${gameId}`);
        io.to(gameId).emit('player_left', { nickname });
    });
};
