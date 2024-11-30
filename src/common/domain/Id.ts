import { ValueObject } from './valueObject';
import { v4 as uuidv4 } from 'uuid';
export class ID extends ValueObject<string> {
  static create() {
    const id = uuidv4();
    return new ID(id);
  }

  static createFromInput(id: string) {
    return new ID(id);
  }
}
