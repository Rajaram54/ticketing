import express from 'express';
import { currentUser } from '@rajaram54/common';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/api/user/currentuser', currentUser, (req, res)=>{
   res.send({currentUser: req.currentUser});
});


export { router as currentUserRouter }; 