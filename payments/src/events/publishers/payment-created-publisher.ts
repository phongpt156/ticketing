import { PaymentCreatedEvent, Publisher, Subjects } from '@phongpt156/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
