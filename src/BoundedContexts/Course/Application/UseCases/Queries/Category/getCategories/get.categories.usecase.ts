import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriesQuery } from './get.categories.query';
import { Inject } from '@nestjs/common';
import { CategoryRepository } from 'src/BoundedContexts/Course/Application/Ports/category.repository.port';
@QueryHandler(GetCategoriesQuery)
export class GetCategoriesUseCase implements IQueryHandler<GetCategoriesQuery> {
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}
  async execute(_query: GetCategoriesQuery): Promise<any> {
    return await this.categoryRepository.findCategories();
  }
}
