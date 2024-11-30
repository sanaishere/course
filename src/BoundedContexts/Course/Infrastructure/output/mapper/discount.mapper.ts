import { Injectable } from '@nestjs/common';
import { Discount } from 'src/BoundedContexts/Course/Domain/Discount/discount.entity';
import { DiscountPersistance } from '../Persistance/discount/discount.persistance';
import { ID } from 'src/common/domain/Id';
import { Amount } from 'src/BoundedContexts/Course/Domain/Discount/ValueObject/amount';

@Injectable()
export class DiscountMapper {
  async mapDiscountToPersistance(
    entity: Discount,
  ): Promise<DiscountPersistance> {
    const properties = entity.getProperties();
    return {
      id: properties.id.value,
      amount: properties.amount.value,
      expiredDate: properties.expiredDate,
      code: properties.code,
    };
  }

  async mapPersistanceToEntity(
    persistance: DiscountPersistance,
  ): Promise<Discount> {
    return new Discount({
      id: ID.createFromInput(persistance.id),
      amount: new Amount(persistance.amount),
      expiredDate: persistance.expiredDate,
      code: persistance.code,
    });
  }
}
