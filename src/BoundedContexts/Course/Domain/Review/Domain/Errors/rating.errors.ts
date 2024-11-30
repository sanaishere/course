export class RatingRangeIsWrong extends Error {
  statusCode: 400;
  constructor(message: string) {
    super(message);
  }
}
