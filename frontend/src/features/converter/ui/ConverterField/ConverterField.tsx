import styles from './ConverterField.module.css'
import {type ChangeEventHandler, type FocusEventHandler, useId} from "react";
import clsx from "clsx";
import {CurrencyPicker} from "@/components/CurrencyPicker";
import type {CurrencyOption} from "@/types/Currency.ts";



interface Props {
    label: string,
    currency: CurrencyOption,
    readOnly: boolean,
    value: string,
    options: CurrencyOption[],
    onSelect: (code: string) => void;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;

}

export const ConverterField = (props: Props) => {

    const inputId = useId()

    const {
        label,
        currency,
        readOnly,
        onChange,
        value,
        options,
        onFocus,
        onBlur,
        onSelect
    } = props


    return (
        <div className={styles.fieldWrap}>
            <label className={styles.label} htmlFor={inputId}>{label}</label>

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
                    id={inputId}
                />
                <span className={styles.symbol}>
                    {currency.symbol}
                </span>
                <CurrencyPicker selectedCode={currency.code} options={options} onSelect={onSelect}/>
            </div>
        </div>
    )
}