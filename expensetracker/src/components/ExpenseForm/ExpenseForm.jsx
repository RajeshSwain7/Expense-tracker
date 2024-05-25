import styles from "./ExpenseForm.module.css";
import Button from "../Button/Button.jsx";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseForm({setOpenExpense, expenseList, setExpenseList, setExpense, setBalance, editId}) {
    const [formData, setFormData] = useState({
        id : '',
        title: '',
        category: '',
        price: '',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData) {
            console.log(editId);
            const updatedFormData = { ...formData };
            let updatedExpenseList = [...expenseList];
            let deductedAmount = 0; 
    
            if (editId) {
                const oldExpense = updatedExpenseList.find((item) => item.id === editId);
                deductedAmount = parseInt(oldExpense.price); 
                const index = updatedExpenseList.findIndex((item) => item.id === editId);
                if (index !== -1) {
                    updatedExpenseList[index] = updatedFormData;
                }
            } else {
                const id = uuidv4();
                updatedFormData.id = id;
                updatedExpenseList = [...expenseList, updatedFormData];
            }
            setExpenseList(updatedExpenseList);
            localStorage.setItem("expense", JSON.stringify(updatedExpenseList));
            const totalExpense = updatedExpenseList.reduce((sum, expense) => {
                return sum + parseInt(expense.price);
            }, 0);
            setExpense(totalExpense);
    
            let balanceRem = parseInt(localStorage.getItem("balance"));
            balanceRem += deductedAmount; 
            balanceRem -= parseInt(updatedFormData.price); 
            setBalance(balanceRem);
            setOpenExpense(false);
        }
    };
    

    return (
        <div className={styles.formContainer}>
            <h2>{editId ? "Edit Expense" : "Add Expense"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange} required />
                <input type="text" placeholder="Price" name="price" value={formData.price} onChange={handleChange} required />
                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value='' disabled>Select category</option>
                    <option value='food'>Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="travel">Travel</option>
                </select>
                <input name="date" type="date" value={formData.date} onChange={handleChange} required />
                <Button type="submit" style="primary" shadow>Add Expense</Button>
                <Button type="button" style="secondary" shadow onClick={() => setOpenExpense(false)}>Cancel</Button>
            </form>
        </div>
    );
};
