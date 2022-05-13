import { NextFunction, Response } from 'express';

import { DIGITABLE_LINE_REGEX } from '../constants/billing';
import { InvalidDigitableLine } from '../errors/invalid-digitable-line';
import { ShowBarCodeRequest } from '../types/request';

export class BarValidator {
  static execute(req: ShowBarCodeRequest, _res: Response, next: NextFunction) {
    const { digitableLine } = req.params;

    if (!digitableLine) throw new InvalidDigitableLine('Missing digitable line');

    const regex = new RegExp(DIGITABLE_LINE_REGEX);
    if (!digitableLine.match(regex)) throw new InvalidDigitableLine();

    next();
  }
}
