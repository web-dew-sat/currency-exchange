import styles from './Header.module.css'
import brandMark from '@/assets/brand/mark.svg';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <div className={styles.headerLogoTop}>
                    <img src={brandMark} width={28} height={28} alt="" />
                    <p>
                        paritet
                    </p>
                </div>
                <p>
                    КОНВЕРТЕР ВАЛЮТ
                </p>
            </div>
        </header>
    )
}
