class CustomError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly prvateMessage: string,
  ) {
    super(message);
  }
}

export default CustomError;
