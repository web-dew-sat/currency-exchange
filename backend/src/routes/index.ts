import {Router, Response, Request} from 'express';

import currenciesRouter from "./currencies.routes"
import ratesRouter from "./rates.router";
import convertRoutes from "./convert.routes";
const router = Router();

router.use('/api', currenciesRouter);
router.use('/api', ratesRouter);
router.use('/api', convertRoutes);

router.all('*splat', (_req: Request, res: Response) => {
    res.status(404).json(
        {
            error : {
                code: "NOT_FOUND",
                message: 'Страница не найдена'
            }
        }
    );
})

export default router;