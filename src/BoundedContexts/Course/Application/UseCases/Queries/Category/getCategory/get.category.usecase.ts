import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoryQuery } from './get.category.query';
import { Inject } from '@nestjs/common';
import { CategoryRepository } from 'src/BoundedContexts/Course/Application/Ports/category.repository.port';
import { CategoryNotFound } from 'src/BoundedContexts/Course/Domain/Category/Errors/category.errors';

@QueryHandler(GetCategoryQuery)
export class GetCategoriesUseCase implements IQueryHandler<GetCategoryQuery> {
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}
  async execute(query: GetCategoryQuery): Promise<any> {
    const id = query.id;
    const category = await this.categoryRepository.findCategory(id);
    if (!category) {
      throw new CategoryNotFound(`category with id ${id} is not found`);
    }
    return category;
  }
}
