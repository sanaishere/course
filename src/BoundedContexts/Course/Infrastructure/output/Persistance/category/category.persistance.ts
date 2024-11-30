export interface CategoryPersistance {
  id: string;
  name: string;
  description: string;
  parentId?: string | null;
}
