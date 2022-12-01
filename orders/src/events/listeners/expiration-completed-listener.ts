import {
  ExpirationCompletedEvent,
  Listener,
  OrderStatus,
  Subjects,
  TicketCreatedEvent,
} from '@phongpt156/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import { queueGroupName } from './queue-group-name';

export class ExpirationCompletedListener extends Listener<ExpirationCompletedEvent> {
  readonly subject = Subjects.ExpirationCompleted;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompletedEvent['data'], message: Message) {
    const { orderId } = data;

    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status === OrderStatus.Completed) {
      return message.ack();
    }

    order.set({
      status: OrderStatus.Cancelled,
    });

    await order.save();

    new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    message.ack();
  }
}
