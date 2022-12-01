import { Listener, Subjects, TicketCreatedEvent } from '@phongpt156/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], message: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      _id: id,
      title,
      price,
    });

    await ticket.save();

    message.ack();
  }
}
