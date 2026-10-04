import type {Convert} from "../types/convert";
import {getBaseRates} from "./rates.service";
import {BadRequestError} from "../errors/bad-request.error";
import {validateCurrencyCode} from "../helpers/currency.validators";
import {UpstreamError} from "../errors/upstream.error";

export const convertCurrency = async (from: unknown, to: unknown, amount: unknown): Promise<Convert> => {

    const fromCode = validateCurrencyCode(from, 'from');
    const toCode = validateCurrencyCode(to, 'to');

    if (typeof amount !== 'string' || !amount) throw new BadRequestError('Не переданы все необходимые параметры')

    const normalizedAmount = amount.trim();


    if (!/^[0-9]+(?:\.[0-9]+)?$/.test(normalizedAmount)) {
        throw new BadRequestError('Параметр amount должен быть числом, например 100 или 12.50; дробная часть отделяется точкой');
    }

    const numericAmount = Number(normalizedAmount);
    const isAmountFinite = Number.isFinite(numericAmount);

    if (!isAmountFinite || numericAmount <= 0) {
        throw new BadRequestError('Параметр amount должен быть конечным положительным числом')
    }

    let conversionResult: Convert;

    if (fromCode === toCode) {
        conversionResult = {
            from: fromCode,
            to: toCode,
            amount: numericAmount,
            rate: 1,
            result: numericAmount,
            date: null,
        }
        return conversionResult;
    }

    const rates = await getBaseRates(fromCode, toCode);

    const matchingRate = rates.find(rate => rate.base === fromCode && rate.quote === toCode)

    if (!matchingRate) throw new UpstreamError("Не удалось получить курс указанной валютной пары");

    conversionResult = {
        from: matchingRate.base,
        to: matchingRate.quote,
        amount: numericAmount,
        rate: matchingRate.rate,
        result: numericAmount * matchingRate.rate,
        date: matchingRate.date,
    }

    if(!Number.isFinite(conversionResult.result)){
        throw new BadRequestError('Сумма слишком велика для конвертации')
    }
    return conversionResult
}
