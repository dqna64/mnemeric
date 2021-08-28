import styles from "../../styles/MenuBar.module.css";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CipherOptionButton from "./CipherOptionButton";

const useStyles = makeStyles((theme) => ({
    menubar: {
        borderRadius: 20,
        backgroundColor: "#ebebeb",
        padding: 20,
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
}));

function MenuBar(props) {
    const classes = useStyles();

    return (
        <Paper classes={{ root: classes.menubar }} elevation={5}>
            <div className={styles.menuSubtitle}>Special code types</div>
            {props.options.map((option, id) => (
                <CipherOptionButton
                    title={option.title}
                    example={option.example}
                    route={option.route}
                    key={id}
                />
            ))}
        </Paper>
    );
}

export default MenuBar;
