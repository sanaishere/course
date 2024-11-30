import { ValueObject } from 'src/common/domain/valueObject';
import { AmountIsUnValidPercent } from '../Errors/discount.error';

export class Amount extends ValueObject<number> {
  constructor(amount: number) {
    super(amount);
  }

  static validate(amount: number) {
    if (amount > 100 || amount < 1) {
      throw new AmountIsUnValidPercent(
        'amount is a percentage between 1 and 100',
      );
    }
  }

  static create(amount: number) {
    return new Amount(amount);
  }
}
