import { Response } from 'express';

import { ShowBarCodeRequest } from '../shared/types/request';

export class BarController {
  async show(req: ShowBarCodeRequest, res: Response) {
    const { barCode } = req.params;

    return res.json({
      barCode,
      amount: 20.0,
      expirationDate: new Date().toISOString(),
    });
  }
}
