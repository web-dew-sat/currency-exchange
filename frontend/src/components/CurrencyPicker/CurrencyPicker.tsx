import styles from "@/components/CurrencyPicker/CurrencyPicker.module.css";
import {ChevronDown, X} from "lucide-react";
import {useState} from "react";
import clsx from "clsx";
import {CurrencyList} from "@/components/CurrencyPicker/CurrencyList/CurrencyList.tsx";
import type {CurrencyOption} from "@/types/currency.types.ts";



interface Props {
    selectedCode: string
    options: CurrencyOption[];
    onSelect: (code: string) => void;
}

export const CurrencyPicker = (props: Props) => {
    const {selectedCode, options, onSelect} = props;

    const [isOpen, setOpen] = useState(false)

    const handleToggleModal = () => {
        setOpen(previous => !previous)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }
    const handleSelect = (code: string) => {
        onSelect(code);
        setOpen(false);
    };


    return (
        <div className={styles.currencyPicker}>
            <button type='button' className={styles.currencyPickerToggle} onClick={handleToggleModal} aria-expanded={isOpen} aria-label='Выбрать валюту'>
                {selectedCode}
                <ChevronDown size={16}/>
            </button>
            <div className={clsx(styles.currencyPickerModal, {
                [styles.openModal]: isOpen
            })}>
                <div className={styles.modalTop}>
                <p className={styles.modalTitle}>Выберите валюту</p>
                    <button className={styles.closeModal} onClick={handleCloseModal} type='button' aria-label="Закрыть выбор валюты">
                        <X size={20} color="#626B5B"/>
                    </button>
                </div>
               <CurrencyList options={options} selectedCode={selectedCode} onSelect={handleSelect} />
            </div>
        </div>

    )
}