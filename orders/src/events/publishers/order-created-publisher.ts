import { OrderCreatedEvent, Publisher, Subjects } from '@phongpt156/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
