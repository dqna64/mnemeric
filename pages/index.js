import { Router } from "next/dist/client/router";
import OptionCard from "../components/OptionCard";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.homePageContainer}>
            <div className={styles.headingText}>
                Exchange meaningless serials and passcodes for natural language.
            </div>
            <div className={styles.optionCardsContainer}>
                <OptionCard
                    title={"Cipher"}
                    description={"Convert a sentence into a passcode."}
                    exampleLeft={"nonsense-is-strength"}
                    exampleRight={"743893"}
                    onClickReroute={"/ciphering/cipher"}
                />
                <OptionCard
                    title={"Decipher"}
                    description={"Convert code into natural language."}
                    exampleLeft={"ZH43Ay92BSJ86AJSG"}
                    exampleRight={"short-clear-phrase"}
                    onClickReroute={"/ciphering/decipher"}
                />
            </div>
        </div>
    );
}
