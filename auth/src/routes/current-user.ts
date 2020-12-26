import express from 'express';
import { currentUser } from '../middlewares/current-user';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/api/user/currentuser', currentUser, (req, res)=>{
   res.send({currentUser: req.currentUser});
});


export { router as currentUserRouter }; 