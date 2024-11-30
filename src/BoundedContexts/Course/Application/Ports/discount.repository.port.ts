import { Discount } from '../../Domain/Discount/discount.entity';
const DiscountRepository = Symbol('DiscountRepository ');
export interface DiscountRepository {
  create: (discount: Discount) => Promise<void>;
  findOne: (discountId: string) => Promise<Discount | null>;
  //paginated
  findAll: (amount?: 'asc' | 'desc') => Promise<Discount[]>;
  save: (discout: Discount) => Promise<void>;
  delete: (discountId: string) => Promise<void>;
}
