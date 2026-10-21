export type Currency = {
    code: string;
    name: string;
    symbol: string | null;
    coverageEndDate: string | null;
    numeric: string | null;
}

export type ApiCurrency = {
    "iso_code": string,
    "name": string,
    "symbol": string | null,
    "end_date": string | null
    "iso_numeric": string | null;
}