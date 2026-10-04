import { Router } from 'express';
import {getBaseRates} from "../controllers/rates.controller";


const router = Router();

router.get('/rates', getBaseRates);


export default router;