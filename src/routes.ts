import { Router } from 'express';

import { BarController } from './controllers/bar-controller';
import { HealthController } from './controllers/health-controller';
import { BarValidator } from './shared/middlewares/bar-validator';

export const routes = Router();

const barController = new BarController();
const healthController = new HealthController();

routes.get('/health', healthController.health);

routes.get('/boleto/:digitableLine', BarValidator.execute, barController.show);
