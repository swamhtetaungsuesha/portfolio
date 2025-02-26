export class APIServiceError extends Error {
  status: number;
  code: string;
  message: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "APIServiceError";
    this.status = status;
    this.code = code;
    this.message = message;
  }
}
