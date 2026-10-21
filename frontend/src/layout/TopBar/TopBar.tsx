import styles from './TopBar.module.css'
import {ArrowUpRight} from "lucide-react";

export const TopBar = () => {
    return (
        <div className={styles.topBar}>
            <p className={styles.topBarText}>
                Конвертер и курсы валют
            </p>
            <p className={styles.topBarSource}>
                Источник данных · <a href="https://frankfurter.dev/" target='_blank' rel="nofollow noopener noreferrer"> Frankfurter <ArrowUpRight size={16} color="#626B5B"/></a>
            </p>
        </div>
    )
}