import nats from 'node-nats-streaming';
import {TicketCreationListener} from './events/ticketCreationListener';
import { randomBytes } from 'crypto'

console.clear();
//in nats terminology we use stan for client
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', ()=> {
    console.log('Listener connected to NATS!!!');

    stan.on('close', ()=> {
       console.log('NATs connection closed!') ;
       process.exit();
    });

  new TicketCreationListener(stan).listen();


});

//signal interepted/ terminated ---> to instantly close the subscription to close after terminating since nats wait for 30 sec 
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());




