import {BadRequestError} from "../errors/bad-request.error";

export const isCurrencyCode = (currencyCode: string): boolean => /^[A-Z]{3}$/.test(currencyCode);

export const validateCurrencyCode = (value: unknown, parameterName: string): string => {
    if (typeof value !== 'string') {
        throw new BadRequestError(`Параметр ${parameterName} обязателен и должен быть одной строкой`);
    }

    const normalizedCode = value.trim().toUpperCase();

    if (!isCurrencyCode(normalizedCode)) {
        throw new BadRequestError(`Параметр ${parameterName} должен содержать ровно три латинские буквы`);
    }
    return normalizedCode;
}
export const validateQuotesParam = (quotes: unknown, parameterName: string): string | undefined => {
    if (quotes === undefined) {
        return undefined;
    }
    if (typeof quotes !== 'string') {
        throw new BadRequestError(`Параметр ${parameterName} должен быть одной строкой`);
    }

    const quoteCodes = quotes.split(',');
    const normalizedQuoteCodes: string[] = [];

    quoteCodes.forEach(quoteCode => {
        const normalizedQuoteCode = quoteCode.trim().toUpperCase();
        if (!isCurrencyCode(normalizedQuoteCode)) {
            throw new BadRequestError('Параметр ${parameterName} должен содержать ровно три латинские буквы');
        }
        normalizedQuoteCodes.push(normalizedQuoteCode);
    })

    const uniqueQuoteCodes = [...new Set(normalizedQuoteCodes)]

    return uniqueQuoteCodes.join(',');

}
