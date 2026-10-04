import { Router } from 'express';
import {convertController} from "../controllers/convert.controller";


const router = Router();

router.get('/convert', convertController);


export default router;