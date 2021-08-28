import styles from "../styles/OptionCard.module.css";

function OptionCard(props) {
    return (
        <div className={styles.cardContainer}>
            <h1>Decipher</h1>
            <p>Convert a code into natural language.</p>
            <div>example code - sentence</div>
        </div>
    );
}

export default OptionCard;
