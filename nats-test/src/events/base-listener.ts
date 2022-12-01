import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  protected ackWait = 5 * 1000;

  constructor(private client: Stan) {}

  abstract onMessage(data: T['data'], message: Message): void;

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (message: Message) => {
      const data = message.getData();

      if (typeof data === 'string') {
        console.log(
          `Message received: ${this.subject} / ${this.queueGroupName}`
        );

        const parsedData = this.parseMessage(message);

        this.onMessage(parsedData, message);
      }

      message.ack();
    });
  }

  parseMessage(message: Message) {
    const data = message.getData();

    if (typeof data === 'string') {
      return JSON.parse(data);
    }

    return JSON.parse(data.toString('utf8'));
  }
}
