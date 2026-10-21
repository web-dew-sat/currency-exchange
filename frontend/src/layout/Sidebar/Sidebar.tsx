import styles from './Sidebar.module.css'
import {Header} from "@/layout/Header/Header.tsx";
import {Navigation} from "@/components/Navigation/Navigation.tsx";

export const Sidebar = () => {
    return(
        <div className={styles.sidebar}>
            <Header/>
            <Navigation/>
            <div className={styles.aboutService}>
                <p className={styles.aboutServiceTitle}>
                    О СЕРВИСЕ
                </p>
                <p className={styles.aboutServiceText}>
                    Расчёт сумм <br/>
                    по курсам валют.
                </p>
            </div>
        </div>
    )
}