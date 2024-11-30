export class CreateCategoryCommand {
  declare props: {
    name: string;
    description: string;
    parentId?: string | null;
  };
  constructor(props: CreateCategoryCommand) {
    this.props = props.props;
  }
}
