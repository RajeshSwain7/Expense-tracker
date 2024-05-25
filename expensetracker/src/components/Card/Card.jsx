import styles from "./Card.module.css";
import Button from "../Button/Button.jsx";

export default function Card({ handleClick, title, money, buttonType, buttonText, success=false}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                {`${title}: `}
                <span className={success ? styles.success : styles.failure}>{`₹${money}`}</span>
            </div>
            <Button style={buttonType} handleClick={handleClick}>{buttonText}</Button>
        </div>
    );
}
