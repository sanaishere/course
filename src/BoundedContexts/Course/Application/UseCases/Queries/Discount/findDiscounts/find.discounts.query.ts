export class GetDiscountsQuery {
  order?: Order;
  constructor(order: Order) {
    this.order = order;
  }
}

export enum Order {
  MaxDiscount = 'MaxDiscount',
  MinDiscount = ' MinDiscount',
}
