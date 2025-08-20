import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

interface SocketState {
    socket: Socket | null;
    socketId: string;
    username: string;
    players: string[];
    gameState: 'waiting' | 'in_progress' | 'finished';
}

const initialState: SocketState = {
    socket: null,
    username: '',
    players: [],
    socketId: '',
    gameState: 'waiting',
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connectSocket: (state, action: PayloadAction<{ username: string; sessionId: string }>) => {
            state.username = action.payload.username;
            state.socketId = action.payload.sessionId;
        },
        setSocket: (state, action: PayloadAction<Socket | null>) => {
            state.socket = action.payload;
        },
        disconnectSocket: (state) => {
            state.socket?.disconnect();
            state.socket = null;
            state.username = '';
            state.players = [];
        },
        setPlayers(state, action: PayloadAction<string[]>) {
            state.players = action.payload;
        },
        startGame(state) {
            state.gameState = 'in_progress';
        },
    },
});

export const { connectSocket, setSocket, disconnectSocket, setPlayers, startGame } =
    socketSlice.actions;
export default socketSlice.reducer;
