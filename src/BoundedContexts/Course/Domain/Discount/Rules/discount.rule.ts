import {
  DiscountExpiredDateInPast,
  DiscountStartDateGreater,
  DiscountStartDateInPast,
} from '../Errors/discount.error';

export function validateDate(startDate: Date, expiredDate: Date) {
  if (expiredDate < new Date()) {
    throw new DiscountExpiredDateInPast('expired date is not valid');
  }

  if (startDate < new Date()) {
    throw new DiscountStartDateInPast('start date is not valid');
  }

  if (startDate > expiredDate) {
    throw new DiscountStartDateGreater(
      'statdate must be less than expireddate',
    );
  }
}
