export type RateDto = {
    "date": string,
    "base": string,
    "quote": string,
    "rate": number
}


export type GetRatesArgs =  {
    base: string;
    quotes: string;
}