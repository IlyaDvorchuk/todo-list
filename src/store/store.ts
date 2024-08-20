import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './reducers/Todos/TodosSlice';
import {todosApi} from "../services/todoApi";

export const store = configureStore({
    reducer: {
        [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;