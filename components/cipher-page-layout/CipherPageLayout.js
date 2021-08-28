import { Fragment } from "react";
import styles from "../../styles/CipherPageLayout.module.css";
import MenuBar from "./MenuBar";

function CipherPageLayout(props) {
    return (
        <Fragment>
            <div className={styles.pageTitle}>Decipher</div>
            <div className={styles.pageDescription}>
                Convert a code into natural language.
            </div>
            <div className={styles.pageContentContainer}>
                <div className={styles.menubarContainer}>
                    <MenuBar options={props.data} />
                </div>
                <div className={styles.workbenchContainer}>
                    {props.children}
                </div>
            </div>
        </Fragment>
    );
}

export default CipherPageLayout;
