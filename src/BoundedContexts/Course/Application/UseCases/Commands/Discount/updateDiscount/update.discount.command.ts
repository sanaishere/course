export class UpdateDiscountCommand {
  declare props: {
    id: string;
    amount?: number;
    startDate?: Date;
    expiredDate?: Date;
  };
  constructor(props: UpdateDiscountCommand) {
    this.props = props.props;
  }
}
