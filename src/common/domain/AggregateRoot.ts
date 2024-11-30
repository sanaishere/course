import { Entity } from './entity';
import { Event } from './event';

export class AggregateRoot<T> extends Entity<T> {
  private events: Event[] = [];

  addEvents(event: Event) {
    this.events.push(event);
  }

  clearEvent() {
    this.events = [];
  }

  getEvents() {
    return this.events;
  }
}
