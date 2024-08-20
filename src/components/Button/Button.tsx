import {FC} from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
    text: string;
    onClick: () => void;
}


const Button: FC<ButtonProps> = ({text, onClick}) => {
    return (
        <button
            onClick={onClick}
            className={styles.button}
        >
            {text}
        </button>
    );
};

export default Button;