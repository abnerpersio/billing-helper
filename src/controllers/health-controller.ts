import { Request, Response } from 'express';

export class HealthController {
  async health(_req: Request, res: Response) {
    return res.json({ message: 'ok' });
  }
}
