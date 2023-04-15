import * as dotenv from 'dotenv' ;
dotenv.config()
import "reflect-metadata";
import AppDataSource from "./database/db.config";
import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error-handler.middleware';
import RootRouter from './routes/root.route';
import {LoggerModdleware} from "./middleware/logger.middleware";



const app = express();
const port = 7777;
app.use(express.json());
// use cookie-parser middleware
app.use(cookieParser());
// use Logger middleware
app.use(LoggerModdleware);
app.use('/api/v1/', RootRouter);
app.use(errorHandler);

AppDataSource.initialize().then(() => {
    console.log("Database Connected Successfully!!!")
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}`);
    });

}).catch((error) => console.log("Error Connecting Database", error))



