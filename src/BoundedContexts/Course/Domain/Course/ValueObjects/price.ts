import { ValueObject } from 'src/common/domain/valueObject';
import { PriceCantBeNegative } from '../Errors/course.errors';

export class Price extends ValueObject<number> {
  static Valiate(price: number) {
    if (price < 0) {
      throw new PriceCantBeNegative('price should not be negative');
    }
  }
}
