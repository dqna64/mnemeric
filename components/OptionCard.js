import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/OptionCard.module.css";
import { makeStyles } from "@material-ui/core/styles";
import router from "next/router";
import { aquamarine } from "color-name";

const useStyles = makeStyles({
    cardRoot: {
        width: 345,
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 30,
    },
});

function OptionCard(props) {
    const classes = useStyles();
    return (
        <Card classes={{ root: classes.cardRoot }}>
            <CardActionArea onClick={() => router.push(props.onClickReroute)}>
                <CardContent>
                    <div className={styles.contentContainer}>
                        <div className={styles.cardTitle}>{props.title}</div>
                        <div className={styles.cardDescription}>
                            {props.description}
                        </div>
                        <div className={styles.cardExample}>
                            <div className={styles.exampleComponent}>
                                {props.exampleLeft}
                            </div>
                            <div>{"->"}</div>
                            <div className={styles.exampleComponent}>
                                {props.exampleRight}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default OptionCard;
