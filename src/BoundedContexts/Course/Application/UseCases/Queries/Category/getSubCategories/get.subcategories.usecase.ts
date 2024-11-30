import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSubCategoryQuery } from './get.subcategories.query';
import { Inject } from '@nestjs/common';
import { CategoryRepository } from 'src/BoundedContexts/Course/Application/Ports/category.repository.port';

@QueryHandler(GetSubCategoryQuery)
export class GetCategoriesUseCase
  implements IQueryHandler<GetSubCategoryQuery>
{
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}
  async execute(query: GetSubCategoryQuery): Promise<any> {
    const id = query.parentId;
    const subCategories = await this.categoryRepository.getSubCategories(id);
    return subCategories;
  }
}
