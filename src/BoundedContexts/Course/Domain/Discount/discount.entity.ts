import { AggregateRoot } from 'src/common/domain/AggregateRoot';
import { Amount } from './ValueObject/amount';
import { ID } from 'src/common/domain/Id';
import { DiscountExpiredDateInPast } from './Errors/discount.error';
import { validateDate } from './Rules/discount.rule';
import {
  DiscountAmountUpdatedEvent,
  DiscountCreatedEvent,
  DiscountExpiredDateUpdatedEvent,
  DiscountStartDateUpdatedEvent,
} from './event';

interface DiscountType {
  id: ID;
  amount: Amount;
  expiredDate: Date;
  startDate: Date;
  code: string;
}

interface CreateDiscountProps {
  amount: number;
  expiredDate: Date;
  startDate: Date;
  code: string;
}
export class Discount extends AggregateRoot<DiscountType> {
  static create(props: CreateDiscountProps) {
    Amount.validate(props.amount);
    validateDate(props.startDate, props.expiredDate);
    const discount = new Discount({
      id: ID.create(),
      amount: Amount.create(props.amount),
      expiredDate: props.expiredDate,
      code: props.code,
      startDate: props.startDate,
    });
    discount.addEvents(new DiscountCreatedEvent(discount));
    return discount;
  }

  updateAmount(amount: number) {
    Amount.validate(amount);
    this.properties.amount = new Amount(amount);
    this.addEvents(
      new DiscountAmountUpdatedEvent({ id: this.properties.id.value, amount }),
    );
  }

  updateExpiredDate(date: Date) {
    validateDate(this.properties.startDate, date);
    this.properties.expiredDate = date;
    this.addEvents(
      new DiscountExpiredDateUpdatedEvent({
        id: this.properties.id.value,
        expiredDate: date,
      }),
    );
  }

  updateStartDate(date: Date) {
    validateDate(date, this.properties.expiredDate);
    this.properties.startDate = date;
    this.addEvents(
      new DiscountStartDateUpdatedEvent({
        id: this.properties.id.value,
        startDate: date,
      }),
    );
  }

  isExpired() {
    return this.properties.expiredDate <= new Date();
  }

  isExpiredInDate(date: Date) {
    return this.properties.expiredDate === date;
  }

  isActive() {
    return (
      this.properties.startDate <= new Date() &&
      this.properties.expiredDate > new Date()
    );
  }
}
