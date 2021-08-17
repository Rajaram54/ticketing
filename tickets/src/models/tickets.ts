import mongoose from 'mongoose';

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

interface TicketDocument extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
    build(attr: TicketAttrs): TicketDocument;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String, // referring to javascript type hence using capital 
        required: true
    },
    price: {
        type: Number, // referring to javascript type hence using capital 
        required: true
    },
    userId: {
        type: String, // referring to javascript type hence using capital 
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}

const Ticket = mongoose.model<TicketDocument, TicketModel>('Ticket', ticketSchema);

export {Ticket};