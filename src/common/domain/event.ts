export class Event {
  readonly props: {
    data: any;
    createdDate?: Date;
  };
  constructor(props: Event) {
    this.props = {
      ...props.props,
      createdDate: new Date(),
    };
  }
}
