import styles from './Converter.module.css'
import {ConverterField} from "@/features/converter/ui/ConverterField/ConverterField.tsx";
import {ArrowUpDown} from "lucide-react";
import {type ChangeEvent, useState} from "react";

export const Converter = () => {
    const [value, setValue] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (/^\d*$/.test(e.target.value)) {
            setValue((e.target as HTMLInputElement).value);
        } else {
            return
        }
    }

    return (
        <div className={styles.converter}>
            <div className={styles.converterTopBar}>
                <p className={styles.converterTitle}>
                    Расчёт суммы
                </p>
                <p className={styles.currencyPair}>
                    EUR / USD
                </p>
            </div>
            <div className={styles.fieldsWrapper}>
                <ConverterField
                    label='Сумма'
                    currency={
                        {code: 'EUR', symbol: '€', numeric: '001'}
                    }
                    readOnly={false}
                    onChange={handleChange}
                    value={value}
                />
                <button className={styles.reverseBtn} type={'button'}>
                    <ArrowUpDown size={20}/>
                </button>
                <ConverterField
                    label='Результат'
                    currency={
                        {code: 'USD', symbol: '$', numeric: '002'}
                    }
                    readOnly={true}
                    value='-'
                />
            </div>

        </div>
    )
}