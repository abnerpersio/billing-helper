import { RequestError } from './request-error';

export class InvalidDigitableLine extends RequestError {
  constructor(message?: string) {
    super(message ?? 'Invalid digitable line', 400);
  }
}
