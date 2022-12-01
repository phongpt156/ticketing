import { Listener, OrderCreatedEvent, Subjects } from '@phongpt156/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    const order = Order.build({
      ...data,
      price: data.ticket.price,
    });
    await order.save();

    message.ack();
  }
}
