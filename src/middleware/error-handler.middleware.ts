import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(error)
  }
  res.status(500)
  res.send({ error: error })
}

export default errorHandler; 
