import {Request, Response} from "express";
import {getAllCurrencies as loadCurrencies} from "../services/currencies.service";

export const getAllCurrencies = async (_req: Request, res: Response) => {

    const currencies  = await loadCurrencies()

    res.json(currencies);
}