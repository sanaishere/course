export class CategoryNotFound extends Error {
  statusCode: 404;
  constructor(message: string) {
    super(message);
  }
}
