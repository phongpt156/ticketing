import { Publisher, Subjects, TicketCreatedEvent } from '@phongpt156/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
