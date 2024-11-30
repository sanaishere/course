export class ValueObject<T> {
  declare readonly value: T;
  constructor(value: T) {
    this.value = Object.freeze(value);
  }
}
