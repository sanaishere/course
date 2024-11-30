import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDiscountCommand } from './delete.discount.command';
import { Inject, Logger } from '@nestjs/common';
import { DiscountRepository } from 'src/BoundedContexts/Course/Application/Ports/discount.repository.port';
import { DiscountIsNotFound } from 'src/BoundedContexts/Course/Domain/Discount/Errors/discount.error';

@CommandHandler(DeleteDiscountCommand)
export class DeleteDiscountUseCase
  implements ICommandHandler<DeleteDiscountCommand>
{
  constructor(
    @Inject('DiscountRepository')
    private discountRepository: DiscountRepository,
  ) {}
  logger = new Logger(DeleteDiscountUseCase.name);

  async execute(command: DeleteDiscountCommand): Promise<any> {
    const id = command.props.discountId;
    const discount = await this.discountRepository.findOne(id);
    if (!discount) {
      throw new DiscountIsNotFound(`discount with id ${id} is not found`);
    }
    try {
      await this.discountRepository.delete(id);
    } catch (error) {
      //catch internal errors
      this.logger.error(error);
    }
  }
}
