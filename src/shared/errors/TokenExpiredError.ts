export default class TokenExpiredError {
  public message: string;

  public data: Record<string, unknown>;

  public statusCode: number;

  constructor(
    message: string,
    data?: Record<string, unknown>,
    statusCode = 501,
  ) {
    this.message = message;
    this.statusCode = statusCode;

    if (data) {
      this.data = data;
    }
  }
}
