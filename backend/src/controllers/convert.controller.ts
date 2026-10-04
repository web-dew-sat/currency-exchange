import {Request, Response} from "express";
import {convertCurrency} from "../services/convert.service";

export const convertController = async (req: Request, res: Response) => {
    const from = req.query.from;
    const to = req.query.to;
    const amount = req.query.amount;
    const conversionResult = await convertCurrency(from, to, amount)

    res.json(conversionResult)
}
