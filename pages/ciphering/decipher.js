import CipherPageLayout from "../../components/cipher-page-layout/CipherPageLayout";
import { decipherOptionsData } from "../../optionsData.js";
import { Paper, Tabs, Tab, Switch, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
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
    cipherDirectionSwitch: {
        // backgroundColor: "#5b76eb",
        background: "linear-gradient(45deg, #5b76eb 30%, #86abf7 90%)",
        fontWeight: "bold",
        borderRadius: 15,
        width: "450px",
    },
    stepContainer: {
        borderRadius: 20,
        marginTop: 22,
        padding: "20px 25px",
        width: "100%",
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
    },
    optionCard: {
        width: "100%",
    },
}));

function Decipher(props) {
    const classes = useStyles();
    // 0 for cipher, 1 for decipher
    const [cipherDirection, setCipherDirection] = useState(1);
    const [options, setOptions] = useState({
        separators: false,
        special: false,
        capital: false,
        lower: false,
        numeric: true,
    });
    const [inputState, setInputState] = useState("");
    const [outputState, setOutputState] = useState("");

    const toggleCipherDirection = (event, newValue) => {
        setCipherDirection(newValue);
    };

    const handleOptionsChange = (event) => {
        setOptions({ ...options, [event.target.name]: event.target.checked });
    };

    function handleInputChange(event) {
        setInputState(event.target.value);
    }

    useEffect(() => {
        console.log("cipherDirection: ", cipherDirection);
        console.log("options: ", options);
        console.log("inputState: ", inputState);
        setOutputState(inputState);
    }, [cipherDirection, options, inputState]);

    return (
        <CipherPageLayout data={decipherOptionsData}>
            <Paper classes={{ root: classes.workbench }} elevation={5}>
                <div className={styles.workbenchTitle}>Custom</div>
                <div className={styles.workbenchDescription}>
                    Specify the format of your code manually with the options
                    below, and we will convert it into a natural language
                    sequence for you.
                </div>
                <Paper className={classes.stepContainer}>
                    <div className={styles.prompt}>
                        Choose your conversion direction
                    </div>
                    <div className={styles.info}>
                        Convert a code into natural langauge.
                    </div>
                    <Paper className={classes.cipherDirectionSwitch}>
                        <Tabs
                            value={cipherDirection}
                            onChange={toggleCipherDirection}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Encode" />
                            <Tab label="Decode" />
                        </Tabs>
                    </Paper>
                </Paper>
                <Paper className={classes.stepContainer}>
                    <div className={styles.prompt}>Build your code format</div>
                    <div className={styles.optionContainer}>
                        <Switch
                            checked={options.separators}
                            onChange={handleOptionsChange}
                            name="separators"
                            inputProps={{
                                "aria-label": "primary checkbox",
                            }}
                        />
                        <div className={styles.optionLabel}>Separators</div>
                        <div className={styles.optionExamples}>{"./-"}</div>
                    </div>
                    <div className={styles.optionContainer}>
                        <Switch
                            checked={options.special}
                            onChange={handleOptionsChange}
                            name="special"
                            inputProps={{
                                "aria-label": "primary checkbox",
                            }}
                        />
                        <div className={styles.optionLabel}>
                            Special Characters
                        </div>{" "}
                        <div className={styles.optionExamples}>
                            {" !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"}
                        </div>
                    </div>
                    <div className={styles.optionContainer}>
                        <Switch
                            checked={options.capital}
                            onChange={handleOptionsChange}
                            name="capital"
                            inputProps={{
                                "aria-label": "primary checkbox",
                            }}
                        />
                        <div className={styles.optionLabel}>
                            Capital alphabetical letters
                        </div>
                        <div className={styles.optionExamples}>
                            {"ABCDEFGHIJKLM"}
                            <br />
                            {"NOPQRSTUVWXYZ"}
                        </div>
                    </div>
                    <div className={styles.optionContainer}>
                        <Switch
                            checked={options.lower}
                            onChange={handleOptionsChange}
                            name="lower"
                            inputProps={{
                                "aria-label": "primary checkbox",
                            }}
                        />
                        <div className={styles.optionLabel}>
                            Lowercase alphabetical letters
                        </div>{" "}
                        <div className={styles.optionExamples}>
                            {"abcdefghijklm"}
                            <br />
                            {"nopqrstuvwxyz"}
                        </div>
                    </div>
                    <div className={styles.optionContainer}>
                        <Switch
                            checked={options.numeric}
                            onChange={handleOptionsChange}
                            name="numeric"
                            inputProps={{
                                "aria-label": "primary checkbox",
                            }}
                        />
                        <div className={styles.optionLabel}>Decimal digits</div>
                        <div className={styles.optionExamples}>
                            {"0123456789"}
                        </div>
                    </div>
                </Paper>
                <Paper className={classes.stepContainer}>
                    <div className={styles.prompt}>
                        {cipherDirection ? "Enter your code" : "Enter a phrase"}
                    </div>
                    <div className={styles.info}>
                        {cipherDirection
                            ? "Input the code you would like to convert into a natural language phrase."
                            : "Input the natural language phrase you would like to convert into a code."}
                    </div>
                    <div className={styles.ioContainerBoth}>
                        <div className={styles.ioContainer}>
                            <div className={styles.ioTitle}>Input</div>
                            <TextField
                                id="input"
                                variant="outlined"
                                value={inputState}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.ioContainer}>
                            <div className={styles.ioTitle}>Output</div>

                            <TextField
                                id="output"
                                variant="outlined"
                                value={outputState}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                </Paper>
            </Paper>
        </CipherPageLayout>
    );
}

export default Decipher;
