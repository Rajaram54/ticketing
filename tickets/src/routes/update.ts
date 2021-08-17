import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {
    requireAuth,
    CustomError,
    NotFoundError,
    NotAuthorizedError,
    validateRequest
} from '@rajaram54/common';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth,[
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0}).withMessage('Price must be grater than 0'),
],validateRequest, async(req: Request, res: Response) => {
       const tickets = await Ticket.findById(req.params.id);
       
       if(!tickets){
           throw new NotFoundError();
       }

       if(tickets.userId !== req.currentUser!.id){
           throw new NotAuthorizedError();
       }

       tickets.set({
           title: req.body.title,
           price: req.body.price
       });

       await tickets.save();

       res.send(tickets);
});


export {router as updateTicketRouter}