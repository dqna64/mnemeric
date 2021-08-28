import styles from "../styles/About.module.css";

function About(props) {
    return (
        <div className={styles.container}>
            Hi! Visit our{" "}
            <a
                className={styles.link}
                href="https://devpost.com/software/mnemeric"
            >
                Devpost Submission
            </a>{" "}
            for more information about our experience creating this project
            during SYNCHACK 2021.
            <br />
            <br />
            <a
                className={styles.link}
                href="https://github.com/dqna64/mnemeric"
            >
                {"View this project's sourcecode on GitHub"}
            </a>
            .
        </div>
    );
}

export default About;
