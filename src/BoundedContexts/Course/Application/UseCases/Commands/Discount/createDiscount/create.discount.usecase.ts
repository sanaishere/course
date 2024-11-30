import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDiscountCommand } from './create.discount.command';
import { Inject, Logger } from '@nestjs/common';
import { DiscountRepository } from 'src/BoundedContexts/Course/Application/Ports/discount.repository.port';
import { Discount } from 'src/BoundedContexts/Course/Domain/Discount/discount.entity';

@CommandHandler(CreateDiscountCommand)
export class CreateDiscountUseCase
  implements ICommandHandler<CreateDiscountCommand>
{
  constructor(
    @Inject('DiscountRepository')
    private discountRepository: DiscountRepository,
  ) {}
  logger = new Logger(CreateDiscountUseCase.name);

  async execute(command: CreateDiscountCommand): Promise<any> {
    const discount = Discount.create({
      amount: command.props.amount,
      startDate: command.props.startDate,
      expiredDate: command.props.expiredDate,
      code: command.props.code,
    });
    try {
      await this.discountRepository.create(discount);
      this.logger.log(`discount ${discount.getProperties().id} is created`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
