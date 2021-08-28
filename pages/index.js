import OptionCard from "../components/OptionCard";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.homePageContainer}>
            <p className={styles.headingText}>
                Exchange meaningless serials and passcodes for natural language.
            </p>
            <div className={styles.optionCardsContainer}>
                <OptionCard />
                <OptionCard />
            </div>
        </div>
    );
}
