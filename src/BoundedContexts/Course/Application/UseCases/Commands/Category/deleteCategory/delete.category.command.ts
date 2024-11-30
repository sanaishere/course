export class DeleteCategoryCommand {
  declare props: {
    categoryId: string;
  };
  constructor(props: DeleteCategoryCommand) {
    this.props = props.props;
  }
}
