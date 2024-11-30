export class CreateDiscountCommand {
  declare props: {
    amount: number;
    expiredDate: Date;
    startDate: Date;
    code: string;
  };
  constructor(props: CreateDiscountCommand) {
    this.props = props.props;
  }
}
