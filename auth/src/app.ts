import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@rajaram54/common';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(cookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false
}));
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async()=>{
    throw new NotFoundError();
});

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("hi");
})

export {app};