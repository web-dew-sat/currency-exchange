import {ArrowUpDown} from "lucide-react";
import {type ChangeEvent, useState} from "react";

import styles from './Converter.module.css'
import {useGetCurrenciesQuery} from "@/api/currencies/currenciesApi.ts";

import {ConverterField} from "@/features/converter/ui/ConverterField/ConverterField.tsx";
import {translateCurrencyName} from "@/utils/translateCurrencyName.ts";
import { useGetRatesQuery} from "@/api/rates/ratesApi.ts";
import type {GetRatesArgs, RateDto} from "@/api/rates/rates.types.ts";
import {skipToken} from "@reduxjs/toolkit/query";
import {formatDate} from "@/utils/formatDate.ts";

export const Converter = () => {
    const [amountText, setAmountText] = useState('')

    const amount = Number(amountText);

    const isAmountReady =
        /\d/.test(amountText) && Number.isFinite(amount);

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

    let ratesArg: GetRatesArgs | undefined;


    const notSameCode = fromCurrency && toCurrency && fromCurrency !== toCurrency

    if(notSameCode) {
        ratesArg = {
            base: fromCurrency.code,
            quotes: toCurrency.code
        }
    }


    const {
        currentData:  ratesData,
        isSuccess: isRatesSuccess
    } = useGetRatesQuery(
        ratesArg ? ratesArg : skipToken
    )

    const currentRate = (ratesData ?? []).find(rate =>  rate.base === fromCurrency.code && rate.quote === toCurrency.code)


    const rateResult = currentRate && isAmountReady ? (currentRate.rate * amount).toString() : ''

    const handleChangeFromCurrency = (currency: string) => {
        setFromCode(currency)
    }
    const handleChangeToCurrency = (currency: string) => {
        setToCode(currency)
    }

    const handleSwapCurrencies = () => {
        if (toCurrency && fromCurrency) {
            setFromCode(toCurrency.code)
            setToCode(fromCurrency.code)
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const nextValue = e.currentTarget.value.replace(/,/g, '.');
        if (/^\d*(?:\.\d*)?$/.test(nextValue)) {
            setAmountText(nextValue);
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
                            value={amountText}
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
                            value={rateResult}
                            onSelect={handleChangeToCurrency}
                            options={options}
                        />
                    </div>
                )
            }
            {isRatesSuccess && (
            <div className={styles.currencyInfo}>
                <p className={styles.currencyInfoPair}>
                    {currentRate && (
                        `1 ${currentRate.base} = ${currentRate.rate + ' ' + currentRate.quote}`
                    )}
                </p>
                <p className={styles.currencyInfoDate}>
                    {currentRate && notSameCode && (
                        `Курс от ${formatDate(currentRate.date)}`
                    )}
                </p>
            </div>
            )}
        </div>
    )
}