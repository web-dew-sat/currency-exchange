import styles from './ConverterField.module.css'
import {ChevronDown} from "lucide-react";
import { type ChangeEventHandler, type FocusEventHandler} from "react";
import clsx from "clsx";

interface Currency {
    code: string,
    symbol: string,
    numeric: string,
}

interface Props {
    label: string,
    currency: Currency,
    readOnly: boolean,
    value: string,
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
}

export const ConverterField = (props: Props) => {


    const {
        label,
        currency,
        readOnly,
        onChange,
        value,
        onFocus,
        onBlur,
    } = props


    return (
        <div className={styles.fieldWrap}>
            <label className={styles.label} htmlFor={currency.numeric}>{label}</label>

            <div className={clsx(styles.field, {
                [styles.fieldResult]: readOnly
            })}>
                <input
                    type="text"
                    value={value}
                    className={styles.valueInput}
                    readOnly={readOnly}
                    placeholder='-'
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    id={currency.numeric}
                />
                <span className={styles.symbol}>
                    {currency.symbol}
                </span>
                <div className={styles.currencyCode}>
                    {currency.code}
                    <ChevronDown size={16}/>
                </div>
            </div>
        </div>
    )
}