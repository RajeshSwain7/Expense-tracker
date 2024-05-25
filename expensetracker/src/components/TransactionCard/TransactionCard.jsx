import styles from "./TransactionCard.module.css";
import { IoPizza , IoGiftOutline} from "react-icons/io5";
import { MdOutlineLuggage } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { LuPencil } from "react-icons/lu";

function formatDate(dateString) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [year, month, day] = dateString.split("-");
    const monthName = months[parseInt(month, 10) - 1];
    const formattedDate = `${monthName} ${parseInt(day, 10)}, ${year}`;

    return formattedDate;
}


export default function TransactionCard({expense ,key, handleDelete, handleEdit}){

    

    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <div className={styles.icon}>
                    {expense.category === "food" &&  <IoPizza />}
                    {expense.category === "entertainment" &&  <IoGiftOutline />}
                    {expense.category === "travel" &&  <MdOutlineLuggage />}
                </div>
                <div className={styles.description}>
                    <h5 className={styles.title}>{expense.title}</h5>
                    <p className={styles.date}>{formatDate(expense.date)}</p>
                </div>
            </div>
            <div className={styles.details}>
                <p className={styles.price}>{`₹${expense.price}`}</p>
                <div className={styles.buttons}>
                    <button className={`${styles.actionIcon} ${styles.primary}`} onClick={handleDelete}>
                        <IoMdCloseCircle />
                    </button>
                    <button className={`${styles.actionIcon} ${styles.secondary}`} onClick={handleEdit}>
                        <LuPencil />
                    </button>
                </div>
            </div>
        </div>
    );
};