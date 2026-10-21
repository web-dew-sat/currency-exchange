import {baseApi} from "@/api/baseApi.ts";
import {type CurrencyDto} from "@/api/currencies/currencies.types.ts";


export const currenciesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCurrencies: build.query<CurrencyDto[], void>({
            query: () => 'currencies',
        }),
    }),
});

 export const {useGetCurrenciesQuery} = currenciesApi;