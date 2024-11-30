export class UpdateCategoryCommand {
  declare props: {
    id: string;
    name?: string;
    description?: string;
  };
  constructor(props: UpdateCategoryCommand) {
    this.props = props.props;
  }
}
