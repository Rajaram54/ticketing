import mongoose from 'mongoose';
import {app} from './app';
import {natsWrapper} from './nats-wrapper';

const start = async() => {

    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY is not configured!!!')
    }

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI is not configured!!!')
    }
    try {
        await natsWrapper.connect('ticketing', 'sdafsdf', 'http://nats-srv:4222');
        natsWrapper.client.on('close', ()=> {
            console.log('NAts closed!!!!');
            process.exit();
        });

        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

      
        console.log("db connected!!!!");
        app.listen(3000, () => {
            console.log("listening on port 3000!");
        });
    } catch (err) {
        console.error(err);
    }
}

start();

