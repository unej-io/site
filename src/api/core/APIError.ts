class APIError extends Error {
  public status: number;

  constructor(data: { status: number; message: string }, options?: ErrorOptions) {
    const { status, message } = data;
    super(message, options);
    this.status = status;
  }
}

export default APIError;
