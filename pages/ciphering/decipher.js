import CipherPageLayout from "../../components/cipher-page-layout/CipherPageLayout";
import { decipherOptionsData } from "../../optionsData.js";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/CipherPage.module.css";

const useStyles = makeStyles((theme) => ({
    workbench: {
        borderRadius: 20,
        backgroundColor: "#ebebeb",
        padding: "20px 30px",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
}));

function Decipher(props) {
    const classes = useStyles();

    return (
        <CipherPageLayout data={decipherOptionsData}>
            <Paper classes={{ root: classes.workbench }} elevation={5}>
                <div className={styles.workbenchTitle}>Alphanumeric</div>
                <div className={styles.workbenchDescription}></div>
            </Paper>
        </CipherPageLayout>
    );
}

export default Decipher;
