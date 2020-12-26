import mongoose from 'mongoose';
import {app} from './app';
const start = async() => {

    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY is not configured!!!')
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
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

