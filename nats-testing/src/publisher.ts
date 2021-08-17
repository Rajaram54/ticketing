import nats from 'node-nats-streaming';
import { TicketCreationPublisher } from './events/ticketCreationPublisher';
 
console.clear();

//in nats terminology we use stan for client
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async()=> {
    console.log('Publisher connected to NATS!!!');

    let publisher = new TicketCreationPublisher(stan);
    
    try {
        await publisher.publish({
            id: '123',
            title: 'concert',
            price: 20
        });
    } catch (e) {
        console.error(e);
    }
});
