export class AmountIsUnValidPercent extends Error {
  statusCode: 400;
  constructor(message: string) {
    super(message);
  }
}

export class DiscountIsExpired extends Error {
  statusCode: 400;
  constructor(message: string) {
    super(message);
  }
}

export class DiscountExpiredDateInPast extends Error {
  statusCode: 400;
  constructor(message: string) {
    super(message);
  }
}

export class DiscountStartDateInPast extends Error {
  statusCode: 400;
  constructor(message: string) {
    super(message);
  }
}

export class DiscountStartDateGreater extends Error {
  statusCode: 400;
  constructor(message: string) {
    super(message);
  }
}

export class DiscountIsNotFound extends Error {
  statusCode: 404;
  constructor(message: string) {
    super(message);
  }
}
