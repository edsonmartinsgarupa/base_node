export interface IApplicationErrorDetail {
  name: string;
  description: string;
}

export default class ApplicationError {
  public process: string;
  public message: string;
  public code: number;
  public detail: IApplicationErrorDetail[];

  constructor(
    process: string,
    message: string,
    code: number,
    detail: IApplicationErrorDetail[]
  ) {
    this.process = process;
    this.message = message;
    this.code = code;
    this.detail = detail;
  }
}
