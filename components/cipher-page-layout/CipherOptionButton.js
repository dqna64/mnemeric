import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import router from "next/router";
import styles from "../../styles/CipherOptionButton.module.css";

const useStyles = makeStyles((theme) => ({
    buttonRoot: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 15,
        width: "100%",
        border: 0,
        marginTop: 14,
        color: "white",
        padding: "8px 15px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    buttonContent: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        textTransform: "capitalize",
    },
}));

function CipherOptionButton(props) {
    const classes = useStyles();

    return (
        <Button
            onClick={() => router.push(`/ciphering/decipher/${props.route}`)}
            classes={{
                root: classes.buttonRoot,
                label: classes.buttonContent,
            }}
        >
            <div className={styles.buttonTitle}>{props.title}</div>
            <div className={styles.buttonExampleText}>{props.example}</div>
        </Button>
    );
}

export default CipherOptionButton;
