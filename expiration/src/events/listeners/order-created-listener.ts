import { Listener, OrderCreatedEvent, Subjects } from '@phongpt156/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queue/expiration-queue';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Wating this milliseconds to process the job: ', delay);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    await message.ack();
  }
}
