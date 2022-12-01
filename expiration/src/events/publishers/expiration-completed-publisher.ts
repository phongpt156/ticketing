import {
  ExpirationCompletedEvent,
  Publisher,
  Subjects,
} from '@phongpt156/common';

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
  readonly subject = Subjects.ExpirationCompleted;
}
