import {FC, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosStart,
    fetchTodosSuccess,
    addTodo,
    updateTodo,
    deleteTodo } from '../../store/reducers/Todos/TodosSlice';
import TodoItem from '../TodoItem/TodoItem';
import Loader from '../Loader/Loader';
import styles from './TodoList.module.scss';
import {RootState} from "../../store/store";
import {Todo} from "../../store/reducers/Todos/TodosTypes";

const TodoList: FC = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state: RootState) => state.todos);
    const [text, setText] = useState('');

    useEffect(() => {
        dispatch(fetchTodosStart());

        setTimeout(() => {
            const mockTodos: Todo[] = [
                { id: '1', text: 'Learn React', completed: false },
                { id: '2', text: 'Learn Redux', completed: true },
                { id: '3', text: 'Learn TypeScript', completed: false },
            ];

            dispatch(fetchTodosSuccess(mockTodos));
        }, 1000);
    }, [dispatch]);

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo({
                id: Date.now().toString(),
                text,
                completed: false,
            }));
            setText('');
        }
    };

    const handleToggleTodo = (id: string) => {
        const todo = items.find(todo => todo.id === id);
        if (todo) {
            dispatch(updateTodo({ ...todo, completed: !todo.completed }));
        }
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div className={styles.todoList}>
            <div className={styles.todoInput}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add new task"
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            {loading ? (
                <Loader />
            ) : (
                items.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={() => handleToggleTodo(todo.id)}
                        onDelete={() => handleDeleteTodo(todo.id)}
                    />
                ))
            )}
        </div>
    );
};

export default TodoList;
