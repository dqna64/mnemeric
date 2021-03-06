import Head from "next/head";
import styles from "../../styles/Layout.module.css";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
// import { useEffect, useState } from "react";

export default function Home(props) {
    // const [offsetY, setOffsetY] = useState(0);
    // const handleScroll = () => setOffsetY(window.pageYOffset);

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Mnemeric</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* <div
                className={styles.parallaxBackground}
                style={{ transform: `translateY(${offsetY * 0.5}px)` }}
            /> */}

            <header className={styles.headerContainer}>
                <NavigationBar />
            </header>

            <div className={styles.bodyContainer}>
                <div className={styles.bodyContentContainer}>
                    {props.children}
                </div>
            </div>

            <footer className={styles.footerContainer}>
                <Footer />
            </footer>
        </div>
    );
}
