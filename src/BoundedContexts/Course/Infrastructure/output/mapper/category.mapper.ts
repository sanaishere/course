import {
  Category,
  CategoryType,
} from 'src/BoundedContexts/Course/Domain/Category/category.entity';
import { CategoryPersistance } from '../Persistance/category/category.persistance';
import { ID } from 'src/common/domain/Id';
import { Description } from 'src/BoundedContexts/Course/Domain/Category/ValueObject/description';
import { Name } from 'src/BoundedContexts/Course/Domain/Category/ValueObject/name';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryMapper {
  async mapCategoryToPersistance(
    entity: Category,
  ): Promise<CategoryPersistance> {
    const properties = entity.getProperties();
    return {
      id: properties.id.value,
      name: properties.name.value,
      description: properties.description.value,
      parentId: properties.parentId,
    };
  }

  async mapPersistanceToCategoryEntity(
    persistance: CategoryPersistance,
  ): Promise<Category> {
    return new Category({
      id: ID.createFromInput(persistance.id),
      name: new Name(persistance.name),
      description: new Description(persistance.description),
      subCategories: [],
      parentId: persistance.parentId,
    });
  }
}
