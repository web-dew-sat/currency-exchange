import {baseApi} from "@/api/baseApi.ts";
import {type GetRatesArgs, type RateDto} from "@/api/rates/rates.types.ts";



export const ratesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getRates: build.query<RateDto[], GetRatesArgs>({
            query: ({ base, quotes }) => ({
                url: 'rates',
                params: { base, quotes },
            }),
        }),
    }),
});

export const {useGetRatesQuery} = ratesApi;