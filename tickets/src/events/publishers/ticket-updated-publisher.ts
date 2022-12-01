import { Publisher, Subjects, TicketUpdatedEvent } from '@phongpt156/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
