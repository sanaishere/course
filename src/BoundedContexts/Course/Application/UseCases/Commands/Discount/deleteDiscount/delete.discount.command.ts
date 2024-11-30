export class DeleteDiscountCommand {
  declare props: {
    discountId: string;
  };
  constructor(props: DeleteDiscountCommand) {
    this.props = props.props;
  }
}
