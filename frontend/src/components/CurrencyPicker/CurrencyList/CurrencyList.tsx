import styles from "./CurrencyList.module.css"
import {CurrencyItem} from "@/components/CurrencyPicker/CurrencyItem/CurrencyItem.tsx";
import type {CurrencyOption} from "@/types/Currency.ts";

interface CurrencyListProps {
    options: CurrencyOption[];
    selectedCode: string;
    onSelect: (code: string) => void;
}

export const CurrencyList = (props: CurrencyListProps) => {
    const {options, selectedCode, onSelect} = props

    return (
        <ul className={styles.currencyList}>
            {
                options.map(option => {
                    return <CurrencyItem
                        key={option.code}
                        option={option}
                        isSelected={selectedCode === option.code }
                        onSelect={onSelect}
                    />
                })
            }
        </ul>
    )
}