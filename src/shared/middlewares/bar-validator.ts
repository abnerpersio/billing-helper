import { NextFunction, Response } from 'express';

import { BAR_CODE_REGEX } from '../constants/billing';
import { InvalidBarCode } from '../errors/invalid-bar-code';
import { ShowBarCodeRequest } from '../types/request';

export class BarValidator {
  static execute(req: ShowBarCodeRequest, _res: Response, next: NextFunction) {
    const { barCode } = req.params;
    const regex = new RegExp(BAR_CODE_REGEX);

    if (!barCode) throw new InvalidBarCode('Missing barcode');
    if (!barCode.match(regex)) throw new InvalidBarCode();

    next();
  }
}
