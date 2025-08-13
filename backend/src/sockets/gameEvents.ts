import { Server, Socket } from 'socket.io';

export const registerGameEvents = (io: Server, socket: Socket) => {
    socket.on('join_game', ({ gameId, nickname }) => {
        socket.join(gameId);
        console.log(`👤 ${nickname} joined game ${gameId}`);
        io.to(gameId).emit('player_joined', { nickname });
    });

    socket.on('start_game', ({ gameId }) => {
        console.log(`🎯 Game ${gameId} started`);
        io.to(gameId).emit('game_started');
    });
};
