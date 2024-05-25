import { useState } from "react";
import styles from "./AddBalanceForm.module.css";
import Button from "../Button/Button";

export default function AddBalanceForm({ setOpenBalance, setBalance }) {
    const [income, setIncome] = useState('');

    const handleBalance = (event) => {

        if(income < 0) {
            console.log("Error");
        }

        event.preventDefault(); 
        const newBalance = parseInt(income, 10) + parseInt(localStorage.getItem("balance"), 10); 
        setBalance(newBalance); 
        localStorage.setItem("balance", newBalance); 
        setOpenBalance(false); 
    }

    const handleClose = () => {
        console.log("close");
        setOpenBalance(false);
    }

    return (
        <div className={styles.formContainer}>
            <h2>Add Balance</h2>

            <form onSubmit={handleBalance}>
                <input 
                    type="number"
                    placeholder="Enter Amount" 
                    value={income} 
                    onChange={(e) => setIncome(e.target.value)} 
                    required 
                />

                <Button type="submit" style="primary" shadow>Add Balance</Button>

                <Button style="secondary" shadow onClick={handleClose}>Cancel</Button>
            </form>
        </div>
    );
};
