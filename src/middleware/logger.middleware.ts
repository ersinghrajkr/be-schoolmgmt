import { NextFunction, Request, Response } from "express";



export const LoggerModdleware = (req: Request, res: Response, next: NextFunction) => {
    const protocol = req.protocol;
    const host = req.get("host");
    const url = req.originalUrl;
    const httpMethod = req.method;
    const date = new Date();
    console.log(date.toISOString() + " " +protocol+" "+ host + " "+ url + " " + httpMethod );
    // next is used to pass request to next middleware
    next();
}