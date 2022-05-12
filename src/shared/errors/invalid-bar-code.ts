import { RequestError } from './request-error';

export class InvalidBarCode extends RequestError {
  constructor(message?: string) {
    super(message ?? 'Invalid Bar Code', 400);
  }
}
