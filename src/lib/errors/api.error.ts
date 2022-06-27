import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  static badRequest(message: string) {
    return new ApiError(message, HttpStatus.BAD_REQUEST);
  }
  static internal(message: string) {
    return new ApiError(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  static forbidden(message: string) {
    return new ApiError(message, HttpStatus.FORBIDDEN);
  }
  static notFound(message = 'not found') {
    return new ApiError(message, HttpStatus.NOT_FOUND);
  }
}