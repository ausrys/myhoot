import { configureStore } from '@reduxjs/toolkit';
import socketReducer from './slices/socketSlice';
import { socketMiddleware } from './thunks/socketMiddleware';
export const store = configureStore({
    reducer: {
        socket: socketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['socket.socket'],
            },
        }).concat(socketMiddleware),
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
