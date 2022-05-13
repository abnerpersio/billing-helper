import { Response } from 'express';

import { ArrecadationBilling } from '../shared/billing/arrecadation-billing';
import { BankBilling } from '../shared/billing/bank-billing';
import { RequestError } from '../shared/errors/request-error';
import { ShowBarCodeRequest } from '../shared/types/request';

export class BarController {
  async show(req: ShowBarCodeRequest, res: Response) {
    const { digitableLine } = req.params;

    const isArrecadation = parseInt(digitableLine.charAt(0)) === 8;

    const billing = isArrecadation
      ? new ArrecadationBilling(digitableLine)
      : new BankBilling(digitableLine);

    if (!billing.isValid()) throw new RequestError('Invalid digitable line for billing', 400);

    const barCode = billing.getBarCode();
    const dueDate = billing.getDueDate();
    const amount = billing.getAmount();

    return res.json({
      barCode,
      amount,
      expirationDate: dueDate,
    });
  }
}
