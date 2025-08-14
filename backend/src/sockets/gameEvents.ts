import { Server, Socket } from 'socket.io';
import { GameSession, GameUser } from '../models';
export const registerGameEvents = (io: Server, socket: Socket) => {
    socket.on('joinSession', async ({ sessionId, username }) => {
        try {
            // Save player to DB
            const newPlayer = await GameUser.create({
                sessionId,
                username,
                joinedAt: Date.now(),
            });
            // Save to socket object for disconnect tracking
            socket.data.playerId = newPlayer.id;
            socket.data.sessionId = sessionId;
            socket.join(sessionId);
            console.log(`${username} joined session ${sessionId}`);
            await broadcastPlayers(sessionId);
        } catch (error) {
            console.log(error);
        }
    });
    socket.on('disconnect', async () => {
        console.log('Client disconnected:', socket.id);
        const { playerId, sessionId } = socket.data;
        if (playerId && sessionId) {
            try {
                // If the game session is in waiting status, we can delete users, because they are in waiting room
                const session = await GameSession.findByPk(sessionId);
                if (session?.status === 'waiting') {
                    await GameUser.destroy({ where: { id: playerId } });
                    console.log(`Removed player ${playerId} from session ${sessionId}`);
                    await broadcastPlayers(sessionId);
                } else {
                    console.log(`Player ${playerId} disconnected mid-game, keeping record`);
                }
            } catch (err) {
                console.error('Error removing player on disconnect:', err);
            }
        }
    });

    socket.on('start_game', async ({ sessionId }) => {
        // Optionally verify if this socket is host
        const session = await GameSession.findByPk(sessionId);
        if (!session) return;

        // Update session status in DB
        await session.update({ status: 'in_progress' });

        // Notify all players in room
        io.to(sessionId).emit('game_started', { sessionId });
    });
    // Helper: Send updated player list to everyone in the session
    async function broadcastPlayers(sessionId: string) {
        const players = await GameUser.findAll({
            where: { sessionId },
            attributes: ['username'],
            order: [['joinedAt', 'ASC']],
        });

        io.to(sessionId).emit(
            'playersUpdate',
            players.map((p) => p.username),
        );
    }
};
