import {FRANKFURTER_BASE_URL} from '../constants/urls';
import {UpstreamError} from '../errors/upstream.error';
import type {Rate} from "../types/rates";
import {BadRequestError} from "../errors/bad-request.error";
import {validateCurrencyCode, validateQuotesParam} from "../helpers/currency.validators";

const isRate = (value: unknown): value is Rate => {
    if (typeof value !== 'object' || value === null) return false;

    if (
        !('date' in value)
        || !('base' in value)
        || !('quote' in value)
        || !('rate' in value)
    ) return false;

    if (
        typeof value.date !== 'string' ||
        typeof value.base !== 'string' ||
        typeof value.quote !== 'string'  ||
        typeof value.rate !== 'number' ||
        !Number.isFinite(value.rate)
    ) return false;

    return !(value.date.trim().length < 1 || value.base.trim().length < 1 || value.quote.trim().length < 1 || value.rate <= 0);
}

const filterValidRates = (rates: unknown): Rate[] => {
    if (!Array.isArray(rates)) throw new UpstreamError();

    const validRates = rates.filter(isRate)
    if (!validRates.length) throw new UpstreamError();
    return validRates;
}



export const getBaseRates = async (base: unknown, quotes:unknown): Promise<Rate[]> => {

    const baseCode = validateCurrencyCode(base, 'base');
    const quotesParam = validateQuotesParam(quotes, 'quote');

    if (!FRANKFURTER_BASE_URL) {
        throw new Error('FRANKFURTER_BASE_URL is not configured');
    }

    let queryParams = new URLSearchParams({base: baseCode});

    if(quotesParam){
        queryParams = new URLSearchParams({base: baseCode, quotes: quotesParam});
    }

    let response: Response;

    try {
        response = await fetch(`${FRANKFURTER_BASE_URL}/rates?${queryParams}`);
    } catch {
        throw new UpstreamError('Не удалось связаться с сервисом курсов валют');
    }

    if (response.status === 422) {
        throw new BadRequestError('Некорректная валюта');
    }

    if (!response.ok) {
        throw new UpstreamError('Сервис курсов валют вернул ошибку');
    }

    let data: unknown;

    try {
        data = await response.json();
    } catch {
        throw new UpstreamError('Сервис курсов валют вернул некорректный JSON');
    }

    return filterValidRates(data);
}
