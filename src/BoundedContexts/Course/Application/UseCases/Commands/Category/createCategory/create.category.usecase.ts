import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './create.category.command';
import { Inject, Logger } from '@nestjs/common';
import { CategoryRepository } from 'src/BoundedContexts/Course/Application/Ports/category.repository.port';
import { Category } from 'src/BoundedContexts/Course/Domain/Category/category.entity';
import { CategoryNotFound } from 'src/BoundedContexts/Course/Domain/Category/Errors/category.errors';
@CommandHandler(CreateCategoryCommand)
export class CreateCategoryUseCase
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}
  logger = new Logger(CreateCategoryUseCase.name);

  async execute(command: CreateCategoryCommand): Promise<any> {
    const commandProps = command.props;
    let categoryParent: Category | null = null;
    if (commandProps.parentId) {
      categoryParent = await this.categoryRepository.findCategory(
        commandProps.parentId,
      );
      if (!categoryParent) {
        throw new CategoryNotFound(
          `category with id ${commandProps.parentId} is not found`,
        );
      }
    }
    const category = Category.create({
      name: commandProps.name,
      description: commandProps.description,
      parentId: commandProps.parentId ?? null,
      parent: categoryParent,
    });
    try {
      await this.categoryRepository.create(category);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
