import { Category } from '../../Domain/Category/category.entity';
const CategoryRepository = Symbol('CategoryRepository ');
export interface CategoryRepository {
  create: (category: Category) => Promise<void>;
  getSubCategories: (categoryId: string) => Promise<Category[]>;
  update: (category: Category) => Promise<void>;
  findCategory: (categoryId: string) => Promise<Category | null>;
  findCategories: () => Promise<Category[]>;
  save: (category: Category) => Promise<void>;
  delete: (categoryId: string) => Promise<void>;
}
