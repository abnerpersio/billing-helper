import { NextFunction, Request, Response } from 'express';
import { RequestError } from '../errors/request-error';

export class ErrorHandler {
  static execute(error: Error, _req: Request, res: Response, _next: NextFunction) {
    const { statusCode = 500 } = error as RequestError;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
}
