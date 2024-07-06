class ApiError extends Error {
  status: number;
  errors: Record<string, unknown>[];

  constructor(
    status: number,
    message: string,
    errors: Record<string, unknown>[] = [],
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized');
  }

  static BadRequest(message: string, errors: Record<string, unknown>[] = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
