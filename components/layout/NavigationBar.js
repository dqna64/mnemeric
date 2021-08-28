import styles from "../../styles/Layout.module.css";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import MnemericLogo from "./MnemericLogo";

function NavigationBar() {
    return (
        <Grid
            classes={{ root: styles.navbar }}
            container
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid
                item
                xs={6}
                container
                justifyContent="flex-start"
                wrap="nowrap"
            >
                <Grid item classes={{ root: styles.navbarItemLeft }}>
                    <MnemericLogo width={48} height={48} />
                </Grid>
                <Grid item classes={{ root: styles.navbarItemLeft }}>
                    <Link href="/">Mnemeric</Link>
                </Grid>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end" wrap="nowrap">
                <Grid item classes={{ root: styles.navbarItemRight }}>
                    <Link href="/">Encode</Link>
                </Grid>
                <Grid item classes={{ root: styles.navbarItemRight }}>
                    <Link href="/">Decode</Link>
                </Grid>
                <Grid item classes={{ root: styles.navbarItemRight }}>
                    <Link href="/about">About</Link>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default NavigationBar;
