import styles from './TodoItem.module.scss';
import {Todo} from "../../store/reducers/Todos/TodosTypes";
import {FC} from "react";

interface TodoItemProps {
    todo: Todo;
    onToggle: () => void;
    onDelete: () => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
            <span onClick={onToggle}>{todo.text}</span>
            <div className={styles.actions}>
                <button onClick={onToggle}>{todo.completed ? 'Undo' : 'Complete'}</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default TodoItem;