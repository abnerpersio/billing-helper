import express from 'express';
import 'express-async-errors';

import { routes } from './routes';
import { CorsMiddleware } from './shared/middlewares/cors-middleware';
import { ErrorHandler } from './shared/middlewares/error-handler';

export const server = express();

server.use(CorsMiddleware.execute);

server.use(routes);

server.use(ErrorHandler.execute);
