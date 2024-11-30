import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CategoryRepository } from 'src/BoundedContexts/Course/Application/Ports/category.repository.port';
import { Category } from 'src/BoundedContexts/Course/Domain/Category/category.entity';
import { CategoryMapper } from '../../mapper/category.mapper';
@Injectable()
export class CategoryRepositoryHandler implements CategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
    private mapper: CategoryMapper,
  ) {}

  async create(category: Category): Promise<void> {
    const categoryPersistance =
      await this.mapper.mapCategoryToPersistance(category);
    const data = await this.prisma.category.create({
      data: {
        id: categoryPersistance.id,
        name: categoryPersistance.name,
        description: categoryPersistance.description,
        parent: categoryPersistance.parentId
          ? {
              connect: {
                id: categoryPersistance.parentId,
              },
            }
          : undefined,
      },
    });
  }
  async getSubCategories(categoryId: string): Promise<Category[]> {
    const data = await this.prisma.category.findMany({
      where: {
        parentId: categoryId,
      },
      include: {
        children: true,
      },
    });
    return await Promise.all(
      data.map((d) => this.mapper.mapPersistanceToCategoryEntity(d)),
    );
  }
  async update(category: Category): Promise<void> {}
  async findCategory(categoryId: string): Promise<Category | null> {
    const data = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });
    return data ? this.mapper.mapPersistanceToCategoryEntity(data) : null;
  }

  async findCategories(): Promise<Category[]> {
    const data = await this.prisma.category.findMany();
    const categories = await Promise.all(
      data.map(async (d) => this.mapper.mapPersistanceToCategoryEntity(d)),
    );
    return categories;
  }

  async save(category: Category): Promise<void> {}

  async delete(categoryId: string): Promise<void> {
    await this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }

  async updateName(name: string, id: string) {
    await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async updateDescription(description: string, id: string) {
    await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        description,
      },
    });
  }
}
