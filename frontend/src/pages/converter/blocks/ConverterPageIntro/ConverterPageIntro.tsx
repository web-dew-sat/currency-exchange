import styles from './ConverterPageIntro.module.css'
export const ConverterPageIntro = () => {
    return (
        <div className={styles.converterPageIntro}>
            <p className={styles.converterPageIntroSubtitle}>
                КОНВЕРТЕР ВАЛЮТ
            </p>
            <h1 className={styles.converterPageIntroTitle}>
                Рассчитайте сумму в другой валюте
            </h1>
            <p className={styles.converterPageIntroPostTitle}>
                Выберите валюты и введите сумму.
            </p>
        </div>
    )
}