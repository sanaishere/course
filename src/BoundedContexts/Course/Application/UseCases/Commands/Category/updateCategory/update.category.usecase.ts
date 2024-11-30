import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { CategoryRepository } from 'src/BoundedContexts/Course/Application/Ports/category.repository.port';
import { Category } from 'src/BoundedContexts/Course/Domain/Category/category.entity';
import { UpdateCategoryCommand } from './update.category.commnd';
import { CategoryNotFound } from 'src/BoundedContexts/Course/Domain/Category/Errors/category.errors';
@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryUseCase
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}
  logger = new Logger(UpdateCategoryUseCase.name);

  async execute(command: UpdateCategoryCommand): Promise<any> {
    const commandProps = command.props;
    const category = await this.categoryRepository.findCategory(
      commandProps.id,
    );
    if (!category) {
      throw new CategoryNotFound(
        `category with id ${commandProps.id} is not found`,
      );
    }

    if (commandProps.name) {
      category.updateName(commandProps.name);
    }

    if (commandProps.description) {
      category.updateDescription(commandProps.description);
    }

    try {
      await this.categoryRepository.update(category);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
