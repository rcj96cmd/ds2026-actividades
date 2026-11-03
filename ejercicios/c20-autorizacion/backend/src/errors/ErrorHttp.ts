// Error de negocio que ya sabe qué status devolver. Lo traduce el errorHandler
export class ErrorHttp extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
