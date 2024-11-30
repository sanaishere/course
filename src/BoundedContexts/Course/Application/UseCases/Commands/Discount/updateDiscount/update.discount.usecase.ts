import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDiscountCommand } from './update.discount.command';
import { Inject, Logger } from '@nestjs/common';
import { DiscountRepository } from 'src/BoundedContexts/Course/Application/Ports/discount.repository.port';
import { DiscountIsNotFound } from 'src/BoundedContexts/Course/Domain/Discount/Errors/discount.error';

@CommandHandler(UpdateDiscountCommand)
export class UpdateDiscountUseCase
  implements ICommandHandler<UpdateDiscountCommand>
{
  constructor(
    @Inject('DiscountRepository')
    private discountRepository: DiscountRepository,
  ) {}
  logger = new Logger(UpdateDiscountUseCase.name);

  async execute(command: UpdateDiscountCommand): Promise<any> {
    const commandProps = command.props;
    const discount = await this.discountRepository.findOne(commandProps.id);
    if (!discount) {
      throw new DiscountIsNotFound(
        `discount with id ${commandProps.id} is not found`,
      );
    }

    if (commandProps.amount) {
      discount.updateAmount(commandProps.amount);
    }

    if (commandProps.startDate) {
      discount.updateStartDate(commandProps.startDate);
    }

    if (commandProps.expiredDate) {
      discount.updateExpiredDate(commandProps.expiredDate);
    }

    try {
      await this.discountRepository.save(discount);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
