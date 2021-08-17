import express , {Response, Request} from 'express';
import { NotFoundError } from '@rajaram54/common';
import { Ticket } from '../models/tickets';
 
const router = express.Router();

router.get('/api/tickets/:id', async(req: Request, res: Response) => {

    const ticket = await Ticket.findById(req.body.id);

    if(!ticket){
        throw new NotFoundError();
    }

    res.send(ticket);
});


export {router as showTicketRouter};