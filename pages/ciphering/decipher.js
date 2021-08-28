import styles from "../../styles/Decipher.module.css";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CipherOptionButton from "../../components/CipherOptionButton";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 20,
        backgroundColor: "#ebebeb",
        padding: 20,
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
}));

function Decipher(props) {
    const classes = useStyles();

    return (
        <div>
            <div className={styles.pageTitle}>Decipher</div>
            <div className={styles.pageDescription}>
                Convert a code into natural language.
            </div>
            <div className={styles.pageContentContainer}>
                <div className={styles.menubar}>
                    <Paper classes={{ root: classes.root }} elevation={5}>
                        <div className={styles.menuSubtitle}>
                            Special code types
                        </div>
                        <CipherOptionButton
                            title={"Apple serial number"}
                            example={"ZH43Ay92BSJ86AJSG"}
                        />
                        <CipherOptionButton
                            title={"ISBN (Int. Standard Book Number)"}
                            example={"978-3-16-148410-0"}
                        />
                        <CipherOptionButton
                            title={"Universal Product Code"}
                            example={"0-12345-67890-5"}
                        />
                        <CipherOptionButton
                            title={"Adobe Redemption Code"}
                            example={"3D8A-9C3R-3B7S-9E2J-Q721-B9NX"}
                        />
                    </Paper>
                </div>
                <div className={styles.workbench}>workbench</div>
            </div>
        </div>
    );
}

export default Decipher;
