require('dotenv').config();
import { createConnection, Connection } from 'typeorm';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { routes } from "./routes";
import cookieParser from 'cookie-parser';

createConnection().then(connection =>{
    connection.manager
    const app = express();
    const port = 8000;

       // Middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin: ["http://localhost:3000"] 
    })); 

    routes(app);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));






    