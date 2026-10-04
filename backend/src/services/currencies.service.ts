import {FRANKFURTER_BASE_URL} from '../constants/urls';
import {UpstreamError} from '../errors/upstream.error';
import {ApiCurrency, Currency} from "../types/currency";

// Type Guard
const isApiCurrency = (value: unknown): value is ApiCurrency => {
    if (typeof value !== 'object' || value === null) return false;

    if (
        !('iso_code' in value)
        || !('name' in value)
        || !('symbol' in value)
        || !('end_date' in value)
    ) return false;

    if (
        typeof value.iso_code !== 'string' ||
        typeof value.name !== 'string' ||
        (typeof value.symbol !== 'string' && value.symbol !== null) ||
        (typeof value.end_date !== 'string' && value.end_date !== null)
    ) return false;

    return !(value.iso_code.trim().length < 1 || value.name.trim().length < 1);



}

const transformAllCurrencies = (currencies: unknown): Currency[] => {

    if (!Array.isArray(currencies)) throw new UpstreamError();

    const filteredCurrencies = currencies.filter(isApiCurrency)
    if (!filteredCurrencies.length) throw new UpstreamError();
    return filteredCurrencies.map(currency => {
        return {
            code: currency.iso_code.toUpperCase(),
            name: currency.name,
            symbol: currency.symbol,
            coverageEndDate: currency.end_date,
        }
    })
}


export const getAllCurrencies = async () => {
    if (!FRANKFURTER_BASE_URL) {
        throw new Error('FRANKFURTER_BASE_URL is not configured');
    }

    let response: Response;

    try {
        response = await fetch(`${FRANKFURTER_BASE_URL}/currencies`, {})
    } catch {
        throw new UpstreamError();
    }

    if (!response.ok) {
        throw new UpstreamError();
    }

    let data: unknown;

    try {
        data = await response.json();
    } catch {
        throw new UpstreamError();
    }

    console.log('Данные получены')

    return transformAllCurrencies(data);
}