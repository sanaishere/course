import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from './delete.category.command';
import { Inject, Logger } from '@nestjs/common';
import { CategoryRepository } from 'src/BoundedContexts/Course/Application/Ports/category.repository.port';
import { CategoryNotFound } from 'src/BoundedContexts/Course/Domain/Category/Errors/category.errors';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryUseCase
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}
  logger = new Logger(DeleteCategoryUseCase.name);

  async execute(command: DeleteCategoryCommand): Promise<any> {
    const id = command.props.categoryId;
    const category = await this.categoryRepository.findCategory(id);
    if (!category) {
      throw new CategoryNotFound(`category with id ${id} is not found`);
    }
    const categoryParent = category.hasParent();
    if (categoryParent) {
      categoryParent.deleteSubCategory(category.getProperties().id.value);
    }
    try {
      await this.categoryRepository.delete(id);
    } catch (error) {
      //catch internal errors
      this.logger.error(error);
    }
  }
}
