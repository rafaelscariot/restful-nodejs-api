import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (app: any) => {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return res
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  });
};

export default errorMiddleware;
