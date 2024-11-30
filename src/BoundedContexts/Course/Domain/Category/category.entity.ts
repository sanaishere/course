import { Entity } from 'src/common/domain/entity';
import { ID } from 'src/common/domain/Id';
import { Name } from './ValueObject/name';
import { Description } from './ValueObject/description';
import { AggregateRoot } from 'src/common/domain/AggregateRoot';
import {
  CategoryCreatedEvent,
  CategoryDeletedEvent,
  CategoryDescriptionUpdatedEvent,
  CategoryNameUpdatedEvent,
  SubCategoryAddedEvent,
} from './event';

export interface CategoryType {
  id: ID;
  name: Name;
  description: Description;
  parentId?: string | null;
  parent?: Category | null;
  subCategories: Category[];
}

interface CategoryCreateProps {
  name: string;
  description: string;
  parentId?: string | null;
  parent?: Category | null;
}

export class Category extends AggregateRoot<CategoryType> {
  static create(props: CategoryCreateProps) {
    const category = new Category({
      id: ID.create(),
      name: new Name(props.name),
      description: new Description(props.description),
      parentId: props.parentId,
      parent: props.parent,
      subCategories: [],
    });
    category.addEvents(new CategoryCreatedEvent(category));
    return category;
  }

  addSubCategory(props: CategoryCreateProps) {
    const subCategory = Category.create(props);
    this.properties.subCategories.push(subCategory);
    this.addEvents(new SubCategoryAddedEvent(subCategory));
  }

  deleteSubCategory(id: string) {
    const index = this.properties.subCategories.findIndex(
      (s) => s.getProperties().id.value === id,
    );
    if (index >= 0) {
      this.properties.subCategories.splice(index, 1);
    }

    this.addEvents(new CategoryDeletedEvent(id));
  }

  updateName(name: string) {
    this.properties.name = new Name(name);
    this.addEvents(
      new CategoryNameUpdatedEvent({ id: this.properties.id.value, name }),
    );
  }

  updateDescription(description: string) {
    this.properties.name = new Description(description);
    this.addEvents(
      new CategoryDescriptionUpdatedEvent({
        id: this.properties.id.value,
        description,
      }),
    );
  }

  hasParent() {
    return this.properties.parent;
  }
}
