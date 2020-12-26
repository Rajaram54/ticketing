import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken'
import { User } from '../models/user';
import { BadRequestError } from './../errors/badrequest-error';
import { validateRequest } from '../middlewares/validation-handler';

const router = express.Router();

router.post('/api/user/signup',[
    body('email')
        .isEmail()
        .withMessage('Email is not valid!!!'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20 })
        .withMessage('Password should be in between 4 to 30 characters')
],validateRequest, async (req: Request, res: Response)=> {
    console.log("initiated sing up process")

    const { email, password } = req.body;

    let checkExistUser = await User.findOne({email});

    if (checkExistUser) {
        throw new BadRequestError('User in use!!!');
    }

    let user = User.build({ email, password});
    await user.save();

    //generating jwt object

    const jwtString = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    // storing jwt in session
    req.session = {
        jwt: jwtString
    };

    return res.status(201).send(user);
});


export { router as signUpRouter }; 