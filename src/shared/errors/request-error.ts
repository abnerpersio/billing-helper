export class RequestError extends Error {
  constructor(message: string, private _statusCode?: number) {
    super(message);
  }

  get statusCode() {
    if (!this._statusCode) return 500;
    if (this._statusCode > 500) return 500;
    if (this._statusCode < 0) return 500;

    return this._statusCode;
  }
}
