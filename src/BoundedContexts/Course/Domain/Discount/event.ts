import { Discount } from './discount.entity';
import { Event } from 'src/common/domain/event';

export class DiscountCreatedEvent extends Event {
  constructor(discount: Discount) {
    super({ props: { data: discount } });
  }
}

//   export class DiscountDeletedEvent extends Event {
//     constructor(discountId: string) {
//       super({ props: { data: discountId } });
//     }
//   }

export class DiscountAmountUpdatedEvent extends Event {
  constructor(data: { id: string; amount: number }) {
    super({ props: { data } });
  }
}

export class DiscountStartDateUpdatedEvent extends Event {
  constructor(data: { id: string; startDate: Date }) {
    super({ props: { data } });
  }
}

export class DiscountExpiredDateUpdatedEvent extends Event {
  constructor(data: { id: string; expiredDate: Date }) {
    super({ props: { data } });
  }
}
