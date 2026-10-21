import styles from "./AppLayout.module.css"

import {Sidebar} from "@/layout/Sidebar/Sidebar.tsx";
import {Outlet} from "react-router";
import {TopBar} from "@/layout/TopBar/TopBar.tsx";
import {Footer} from "@/layout/Footer/Footer.tsx";

export const AppLayout = () => {
    return (
        <div className={styles.appLayout}>
            <Sidebar/>
            <main className={styles.appLayoutMain}>
                <TopBar/>
                <Outlet/>
                <Footer/>
            </main>
        </div>
    )
}