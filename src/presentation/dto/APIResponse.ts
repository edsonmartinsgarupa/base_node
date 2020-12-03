import ApplicationError from '../../domain/shared/object_values/ApplicationError';

export default class APIResponse<T> {
  public success: boolean;
  public data!: T;
  public error!: ApplicationError;

  private constructor(success: boolean) {
    this.success = success;
  }

  private addError(error: ApplicationError): void {
    this.error = error;
  }

  private addData(dado: T): void {
    this.data = dado;
  }

  public static withSuccess<T>(dado: T): APIResponse<T> {
    const resposta = new APIResponse<T>(true);
    resposta.addData(dado);
    return resposta;
  }

  public static withError(error: ApplicationError): APIResponse<unknown> {
    const resposta = new APIResponse(false);
    resposta.addError(error);
    return resposta;
  }
}
