import { Request } from 'express';

type BarCodeParams = {
  digitableLine: string;
};

export type ShowBarCodeRequest = Request<BarCodeParams>;
