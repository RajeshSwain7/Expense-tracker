import { useState } from "react";
import TransactionCard from "../TransactionCard/TransactionCard";
import styles from "./TransactionList.module.css";
import CustomModal from "../../components/Modal/CustomModal";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function TransactionList({
  expenseList,
  setExpenseList,
  setExpense,
  setBalance,
  balance,
  expense,
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenseList.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (key) => {
    const item = expenseList.find((item) => item.id === key);
    const balanceAmount = balance - parseInt(item.price);
    const expenseAmount = expense - parseInt(item.price);
    setBalance(balanceAmount);
    setExpense(expenseAmount);
    const filteredList = expenseList.filter((item) => item.id !== key);
    setExpenseList(filteredList);
  };

  const handleEdit = (key) => {
    setEditId(key);
    setIsEditOpen(true);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recent Transactions</h2>
      <div className={styles.transactionList}>
        {currentItems.map((expense) => (
          <div key={expense.id}>
            <TransactionCard
              expense={expense}
              handleDelete={() => handleDelete(expense.id)}
              handleEdit={() => handleEdit(expense.id)}
            />
            <hr className={styles.line} />
          </div>
        ))}
      </div>
    
      {currentItems.length !== 0 ? (
        <div className={styles.pagination}>
        <button
          className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ""}`}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          <BsArrowLeft className={styles.arrowIcon} />
        </button>
        <span className={styles.pageNumber}>{currentPage}</span>
        <button
          className={`${styles.pageBtn} ${
            currentItems.length < itemsPerPage ? styles.disabled : ""
          }`}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentItems.length < itemsPerPage}
        >
          <BsArrowRight className={styles.arrowIcon} />
        </button>
      </div>
      ) : (
        <div className={styles.message}>No Recent Transactions</div>
      )}
      

      <CustomModal isOpen={isEditOpen} setIsOpen={setIsEditOpen}>
        <ExpenseForm
          setOpenExpense={setIsEditOpen}
          expenseList={expenseList}
          editId={editId}
          setExpenseList={setExpenseList}
          setExpense={setExpense}
          setBalance={setBalance}
        />
      </CustomModal>
    </div>
  );
}
