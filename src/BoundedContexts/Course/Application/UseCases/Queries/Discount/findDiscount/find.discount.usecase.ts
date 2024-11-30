import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDiscountQuery } from './find.discount.query';
import { Inject } from '@nestjs/common';
import { DiscountRepository } from 'src/BoundedContexts/Course/Application/Ports/discount.repository.port';
import { DiscountIsNotFound } from 'src/BoundedContexts/Course/Domain/Discount/Errors/discount.error';

@QueryHandler(GetDiscountQuery)
export class GetCategoriesUseCase implements IQueryHandler<GetDiscountQuery> {
  constructor(
    @Inject('DiscountRepository')
    private discountRepository: DiscountRepository,
  ) {}
  async execute(query: GetDiscountQuery): Promise<any> {
    const id = query.id;
    const discount = await this.discountRepository.findOne(id);
    if (!discount) {
      throw new DiscountIsNotFound(`discount ${id} is not found`);
    }
    return discount;
  }
}
