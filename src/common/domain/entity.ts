export class Entity<T> {
  protected declare properties: T;
  constructor(props: T) {
    this.properties = props;
  }

  getProperties() {
    return this.properties;
  }
}
