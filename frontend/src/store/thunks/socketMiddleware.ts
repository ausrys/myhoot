// socketMiddleware.ts
import { type Middleware } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import {
    connectSocket,
    disconnectSocket,
    setSocket,
    setPlayers,
    startGame,
} from '../slices/socketSlice';

const eventActionMap: Record<string, (payload: any) => any> = {
    playersUpdate: setPlayers,
    newQuestion: ,
    game_started: () => startGame(), // triggers the state update
};

export const socketMiddleware: Middleware = (store) => (next) => (action) => {
    if (connectSocket.match(action)) {
        const { username, sessionId } = action.payload;

        const socket = io('http://localhost:5000');
        store.dispatch(setSocket(socket));

        socket.emit('joinSession', { sessionId, username });

        // attach all listeners dynamically
        Object.entries(eventActionMap).forEach(([event, actionCreator]) => {
            socket.on(event, (data: any) => {
                store.dispatch(actionCreator(data));
            });
        });
    }
    if (startGame.match(action)) {
        const socket = store.getState().socket.socket;
        const sessionId = store.getState().socket.socketId;
        socket.emit('startGame', { sessionId });
    }
    if (disconnectSocket.match(action)) {
        const socket = store.getState().socket.socket;
        socket?.disconnect();
        store.dispatch(setSocket(null));
    }

    return next(action);
};
