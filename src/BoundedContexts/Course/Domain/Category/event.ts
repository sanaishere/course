import { Event } from 'src/common/domain/event';
import { Category } from '../Category/category.entity';

export class CategoryCreatedEvent extends Event {
  constructor(category: Category) {
    super({ props: { data: category } });
  }
}

export class CategoryDeletedEvent extends Event {
  constructor(categoryId: string) {
    super({ props: { data: categoryId } });
  }
}

export class SubCategoryAddedEvent extends Event {
  constructor(subCategory: Category) {
    super({ props: { data: subCategory } });
  }
}

export class CategoryNameUpdatedEvent extends Event {
  constructor(data: { id: string; name: string }) {
    super({ props: { data } });
  }
}

export class CategoryDescriptionUpdatedEvent extends Event {
  constructor(data: { id: string; description: string }) {
    super({ props: { data } });
  }
}
