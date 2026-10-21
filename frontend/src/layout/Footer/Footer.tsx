import styles from "./Footer.module.css"


const currentYear  = new Date().getFullYear();

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <p>© {currentYear} Paritet. Сервис не проводит обмен валют.</p>
            <p>
                Курс банка может отличаться. Комиссии не учтены.
            </p>
        </div>
    )
}