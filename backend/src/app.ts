import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import router from "./routes";
import {errorHandler} from "./middlewares/error-handler";

const app = express();
const port  = process.env.SERVER_PORT;

app.use(cors());
app.use(router);


app.use(errorHandler);

const run = async () => {

    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}/`);
        });
    }
    catch (error) {
        console.log(error);
    }

}

run();