import { OrderCancelledEvent, Publisher, Subjects } from '@phongpt156/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
