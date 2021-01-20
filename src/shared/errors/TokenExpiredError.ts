import { stdClass } from '@shared/@types/types';

export default class TokenExpiredError {
  public message: string;

  public data: stdClass;

  public statusCode: number;

  constructor(message: string, data?: stdClass, statusCode = 501) {
    this.message = message;
    this.statusCode = statusCode;

    if (data) {
      this.data = data;
    }
  }
}
