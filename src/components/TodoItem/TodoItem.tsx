import styles from './TodoItem.module.scss';
import {Todo} from "../../store/reducers/Todos/TodosTypes";
import {FC} from "react";
import Button from "../Button/Button";

interface TodoItemProps {
    todo: Todo;
    onToggle: () => void;
    onDelete: () => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <div className={styles.todoItem}>
            <span
                className={`${styles.todoTitle} ${todo.completed ? styles.completed : ''}`}
                onClick={onToggle}>{todo.text}</span>
            <div className={styles.actions}>
                <Button
                    text={todo.completed ? 'Undo' : 'Complete'}
                    onClick={onToggle}
                />
                <Button
                    text={'Delete'}
                    onClick={onDelete}
                />
            </div>
        </div>
    );
};

export default TodoItem;