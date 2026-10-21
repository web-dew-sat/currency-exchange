import {ArrowUpDown} from "lucide-react";
import {type ChangeEvent, useState} from "react";

import styles from './Converter.module.css'
import {useGetCurrenciesQuery} from "@/api/currencies/currenciesApi.ts";

import {ConverterField} from "@/features/converter/ui/ConverterField/ConverterField.tsx";
import {translateCurrencyName} from "@/utils/translateCurrencyName.ts";

export const Converter = () => {
    const [value, setValue] = useState('')

    const [fromCode, setFromCode] = useState('USD')
    const [toCode, setToCode] = useState("RUB")


    const {
        data: currenciesData,
        isSuccess
    } = useGetCurrenciesQuery()

    const options = (currenciesData ?? []).map((option) => {
        return {
            code: option.code,
            name: translateCurrencyName(option.code) ?? option.name,
            symbol: option.symbol ?? option.code,
        }
    })

    const fromCurrency = options.find(currency => currency.code === fromCode) ?? options[0]
    const toCurrency = options.find(currency => currency.code === toCode) ?? options[1] ?? options[0]


    const handleChangeFromCurrency = (currency: string) => {
        setFromCode(currency)
    }
    const handleChangeToCurrency = (currency: string) => {
        setToCode(currency)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (/^\d*$/.test(e.target.value)) {
            setValue(e.target.value);
        }
    }

    const handleSwapCurrencies = () => {

        if(toCurrency && fromCurrency) {
            setFromCode(toCurrency.code)
            setToCode(fromCurrency.code)
        }

    }

    return (
        <div className={styles.converter}>

            <div className={styles.converterTopBar}>
                <p className={styles.converterTitle}>
                    Расчёт суммы
                </p>
                <p className={styles.currencyPair}>
                    {isSuccess && options.length > 0 && (
                        ` ${fromCurrency.code} / ${toCurrency.code}`
                    )}

                </p>
            </div>
            {
                isSuccess && options.length > 0 && (
                    <div className={styles.fieldsWrapper}>

                        <ConverterField
                            label='Сумма'
                            currency={fromCurrency}
                            readOnly={false}
                            onChange={handleChange}
                            value={value}
                            onSelect={handleChangeFromCurrency}
                            options={options}
                        />
                        <button
                            className={styles.reverseBtn}
                            type={'button'}
                            onClick={handleSwapCurrencies}
                        >
                            <ArrowUpDown size={20}/>
                        </button>
                        <ConverterField
                            label='Результат'
                            currency={toCurrency}
                            readOnly={true}
                            value='-'
                            onSelect={handleChangeToCurrency}
                            options={options}
                        />
                    </div>
                )
            }

        </div>
    )
}