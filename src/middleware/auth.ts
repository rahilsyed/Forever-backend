import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
dotenv.config();

const authUser = (req:Request, res:Response, next: NextFunction): void => {

  const { token } = req.headers;
//   console.log("token"+token)

  if (!token) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
  }
  try {

      const token_decode = jwt.verify(token as string, process.env.SECRET_KEY as string);
    //   console.log(token_decode)
    //   console.log("this is token"+(token_decode as JwtPayload).id)
      req.body.userId = (token_decode as JwtPayload).id;
      console.log(req.body.userId)
      
      next();

  } catch (error:any) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message });
      return;
  }

}



export default authUser;