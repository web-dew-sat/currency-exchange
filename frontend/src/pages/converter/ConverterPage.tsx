import styles from './ConverterPage.module.css'
import {ConverterPageIntro} from "@/pages/converter/blocks/ConverterPageIntro/ConverterPageIntro.tsx";
import {Converter} from "@/features/converter";

export const ConverterPage = () => {
    return (
        <div className={styles.converterPage}>
          <ConverterPageIntro/>
            <div className={styles.converterPageWrapper}>
                <Converter/>
            </div>
        </div>
    )
}