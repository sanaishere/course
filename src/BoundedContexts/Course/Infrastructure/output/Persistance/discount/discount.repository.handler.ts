import { PrismaService } from 'nestjs-prisma';
import { DiscountRepository } from 'src/BoundedContexts/Course/Application/Ports/discount.repository.port';
import { Discount } from 'src/BoundedContexts/Course/Domain/Discount/discount.entity';
import { DiscountMapper } from '../../mapper/discount.mapper';

export class DiscountRepositoryHandler implements DiscountRepository {
  constructor(
    private readonly prisma: PrismaService,
    private mapper: DiscountMapper,
  ) {}
  async create(discount: Discount): Promise<void> {
    const discountPersistance =
      await this.mapper.mapDiscountToPersistance(discount);
    await this.prisma.discount.create({
      data: discountPersistance,
    });
  }

  async findOne(discountId: string): Promise<Discount | null> {
    const queryResult = await this.prisma.discount.findFirst({
      where: {
        id: discountId,
      },
    });
    return queryResult
      ? await this.mapper.mapPersistanceToEntity(queryResult)
      : null;
  }
  async findAll(amount?: 'asc' | 'desc'): Promise<Discount[]> {
    const data = await this.prisma.discount.findMany({
      orderBy: amount
        ? {
            amount,
          }
        : {
            expiredDate: 'asc',
          },
    });
    return await Promise.all(
      data.map((d) => this.mapper.mapPersistanceToEntity(d)),
    );
  }
  async save(discout: Discount): Promise<void> {}
  async delete(discountId: string): Promise<void> {
    await this.prisma.discount.delete({
      where: {
        id: discountId,
      },
    });
  }
}
