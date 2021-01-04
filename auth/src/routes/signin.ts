import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user'
import { Password } from '../utils/password';
import { validateRequest, BadRequestError } from '@rajaram54/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/user/signin', [
    body('email')
        .isEmail()
        .withMessage('Enter a valid email!!!'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is missing!!!!')
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new BadRequestError('Invalid credentials!!!');
    }

    const isValidMatch = await Password.compare(existingUser.password, password);

    if (!isValidMatch) {
        throw new BadRequestError('Invalid credentials!!!');
    }

    //generating jwt object

    const jwtString = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    // storing jwt in session
    req.session = {
        jwt: jwtString
    };

    return res.status(200).send(existingUser);
});

export { router as signInRouter }; 