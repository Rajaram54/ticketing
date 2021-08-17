import {Publisher} from './base-publisher';
import {Subject} from './subjects';
import {TicketCreatedEvent} from './ticket-creation-interface';

export class TicketCreationPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;

}