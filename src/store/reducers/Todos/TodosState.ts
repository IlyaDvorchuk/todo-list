import {Todo} from "./TodosTypes";

interface TodosState {
    items: Todo[];
    loading: boolean;
}

export const initialState: TodosState = {
    items: [],
    loading: false,
};