const currencyNames = new Intl.DisplayNames('ru', {
    type: 'currency',
    fallback: 'none',
});

export const translateCurrencyName = (code: string) => {

    return currencyNames.of(code);
}