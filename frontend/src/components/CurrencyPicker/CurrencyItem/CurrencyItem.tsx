import styles from '@/components/CurrencyPicker/CurrencyItem/CurrencyItem.module.css'
import {Check} from "lucide-react";
import clsx from "clsx";
import type {CurrencyOption} from "@/types/currency.types.ts";

interface CurrencyItemProps {
    option: CurrencyOption;
    isSelected: boolean;
    onSelect: (code: string) => void;
}

export const CurrencyItem = ({option, isSelected, onSelect}: CurrencyItemProps) => {
    return (
        <li>
            <button
                type='button'
                className={clsx(styles.currencyItem,
                    {
                        [styles.currencyItemSelected]: isSelected,
                    }
                )
                }
                onClick={() =>  onSelect(option.code)}
            >
            <span className={styles.code}>
                {option.code}
            </span>
                <span className={styles.name}>
                {option.name}
            </span>
                {
                    isSelected && (
                        <Check className={styles.check} color="#526F2F" size={16}/>
                    )
                }
            </button>
        </li>
    )
}
