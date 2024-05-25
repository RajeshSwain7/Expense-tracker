import { useCallback, useEffect, useState } from "react";
import "./HomePage.css";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/CustomModal";
import AddBalanceForm from "../../components/AddBalanceForm/AddBalanceForm";
import CustomModal from "../../components/Modal/CustomModal";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import PieChartComp from "../../components/PieChart/PieChartComp";
import TransactionList from "../../components/TransactionList/TransactionList";
import BarChartComp from "../../components/BarChart/BarChart";

export default function HomePage(){

    const[balance, setBalance] = useState(0);
    const[expense, setExpense] = useState(0);
    const[expenseList, setExpenseList] = useState([]);

    const[openExpense, setOpenExpense] =useState(false);
    const[openBalance, setOpenBalance] = useState(false);

    const[isMounted, setIsMounted] = useState(false);

    const[categorySpends, setCategorySpends] = useState({
        food : 0,
        entertainment: 0,
        travel : 0,
    }); 


    useEffect(() => {
        if(localStorage.getItem("balance")){
            setBalance(localStorage.getItem("balance"));
        }else {
            localStorage.setItem("balance", 5000);
            setBalance(5000);
        }

        const items = JSON.parse(localStorage.getItem("expense"));

        setExpenseList(items || []);
        setIsMounted(true);
    }, []);

    useEffect(() => {

        if(expenseList.length > 0 || isMounted){
            localStorage.setItem("expense", JSON.stringify(expenseList));
        }

        if(expenseList.length > 0){
            const totalExpense = expenseList.reduce((sum, expense) => {
                return sum + parseInt(expense.price);
            }, 0);
            setExpense(totalExpense); 
        }else{
            setExpense(0);
        }

        let food=0, entertainment=0, travel=0;

        expenseList.forEach((expense) => {
            if(expense.category === "food"){
                food += parseInt(expense.price);
            }else if(expense.category === "entertainment"){
                entertainment += parseInt(expense.price);
            }else if(expense.category === "travel"){
                travel += parseInt(expense.price);
            }
        });

        setCategorySpends({
            food : food,
            entertainment : entertainment,
            travel : travel,
        });

    }, [expenseList]);


    useEffect(() => {
        if(isMounted){
            localStorage.setItem("balance", balance);
        }
    }, [balance]);


    return (
        <div className="container">
            <h2 className="title">Expense Tracker</h2>

            <div className="displayContainer">
                <Card
                title="Wallet Balance"
                money={balance}
                buttonType="success"
                buttonText="+ Add Income"
                success
                handleClick={()=> setOpenBalance(true)}
                />

                <Card
                title="Expenses"
                money={expense}
                buttonType="failure"
                buttonText="+ Add Expense"
                handleClick={()=> setOpenExpense(true)}
                />

                <div className="PieChartContainer">
                    <PieChartComp
                    data={[
                    {"name": "Food", value: categorySpends.food},
                    {"name": "Entertainment", value: categorySpends.entertainment},
                    {"name": "Travel", value: categorySpends.travel},
                ]}
                />
                </div>

            </div>

            <div className="historyContainer">
                <TransactionList
                expenseList={expenseList}
                setExpenseList={setExpenseList}
                setExpense={setExpense}
                setBalance={setBalance}
                balance={balance}
                expense={expense}
                />

                <div className="chartComp">
                    <h2>Top Expenses</h2>
                    <BarChartComp
                    data={[
                        {"name": "Food", value: categorySpends.food},
                        {"name": "Entertainment", value: categorySpends.entertainment},
                        {"name": "Travel", value: categorySpends.travel},
                    ]}
                    />
                </div>


            </div>

            <CustomModal isOpen={openExpense} setIsOpen={setOpenExpense}>
                <ExpenseForm
                setOpenExpense={setOpenExpense}
                expenseList={expenseList}
                setExpenseList={setExpenseList}
                setExpense={setExpense}
                setBalance={setBalance}
                />
            </CustomModal>

            <CustomModal isOpen={openBalance} setIsOpen={setOpenBalance}>
                <AddBalanceForm
                setOpenBalance={setOpenBalance}
                setBalance={setBalance}
                />
            </CustomModal>

        </div>
    );
};