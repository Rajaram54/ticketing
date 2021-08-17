import { Publisher, Subject, TicketCreatedEvent } from '@rajaram54/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;
}