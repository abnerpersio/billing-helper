import { Request } from 'express';

type BarCodeParams = {
  barCode: string;
};

export type ShowBarCodeRequest = Request<BarCodeParams>;
