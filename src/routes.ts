import { Router } from 'express';

import { BarController } from './controllers/bar-controller';
import { BarValidator } from './shared/middlewares/bar-validator';

export const routes = Router();

const barController = new BarController();

routes.get('/boleto/:digitableLine', BarValidator.execute, barController.show);
