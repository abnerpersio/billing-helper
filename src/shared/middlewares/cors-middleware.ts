import { NextFunction, Request, Response } from 'express';

export class CorsMiddleware {
  static execute(_req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', '40');

    next();
  }
}
