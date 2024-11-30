import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDiscountsQuery, Order } from './find.discounts.query';
import { Inject } from '@nestjs/common';
import { DiscountRepository } from 'src/BoundedContexts/Course/Application/Ports/discount.repository.port';

@QueryHandler(GetDiscountsQuery)
export class GetDiscountsUseCase implements IQueryHandler<GetDiscountsQuery> {
  constructor(
    @Inject('DiscountRepository')
    private discountRepository: DiscountRepository,
  ) {}
  async execute(query: GetDiscountsQuery): Promise<any> {
    const params = query.order
      ? this.mapOrderToSortOrder(query.order)
      : undefined;
    const discounts = await this.discountRepository.findAll(params);
    return discounts;
  }

  private mapOrderToSortOrder(order: Order) {
    switch (order) {
      case Order.MinDiscount:
        return 'asc';
      case Order.MaxDiscount:
        return 'desc';
    }
  }
}
