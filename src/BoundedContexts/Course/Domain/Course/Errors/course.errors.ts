export class PriceCantBeNegative extends Error {
  statusCode: 404;
  constructor(message: string) {
    super(message);
  }
}

export class CourseNotFound extends Error {
  statusCode: 404;
  constructor(message: string) {
    super(message);
  }
}
