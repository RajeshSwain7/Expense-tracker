import React from "react";
import styles from "./Button.module.css";

const Button = ({ handleClick, style, children, type="button",  shawdow=false }) => {
    return (
        <button
        type={type}
        onClick={handleClick}
        className={`${styles.button} ${styles[style]} ${shawdow && styles.shawdow}`}
        >
            {children}
        </button>
    );
};

export default Button;
