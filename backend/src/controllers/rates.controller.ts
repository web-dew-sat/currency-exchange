import {Request, Response} from "express";
import {getBaseRates as loadRates} from "../services/rates.service";

export const getBaseRates = async (req: Request, res: Response) => {
    const base = req.query.base;
    const quotes = req.query.quotes;
    const rates = await loadRates(base, quotes)

    res.json(rates)
}