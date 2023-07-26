import { Response, Request, NextFunction } from 'express';
const ObjectID = require('mongodb').ObjectID;
type ObjectID = typeof import('mongodb').ObjectID;
import { UserModel } from './authModel';
import { errorMessages } from '../common/errors';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const generateAccessToken = (id: ObjectID): void => {
  const payLoad = {
    id,
  };
  return jwt.sign(payLoad, process.env.SECRET_JWT );
};

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, surname, email, phoneNumber, password } = req.body;
    const candidate = await UserModel.findOne({ email });

    if (candidate) return res.status(400).json({ message: errorMessages.userWithTheSameEmailExist });

    const hashPassword = bcrypt.hashSync(password, 3);

    await UserModel.create({
      password: hashPassword,
      name, surname, email, phoneNumber,
    });

    res.json(errorMessages.userWasSuccessfullyRegistered);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email:email });
    if (!user) {
      return res.status(400).json({ message: errorMessages.userWithSuchEmailNotFound });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: errorMessages.enteredInvalidPassword });
    }
    const token = generateAccessToken(new ObjectID(user._id));
    return res.json({ token });
  } catch (error) {
    next(error);
  }
}
export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const user = await UserModel.findOne({ _id:userId }).select('-password');
    if (!user) return res.status(400).json({ message: `${errorMessages.userNotFound} or ${errorMessages.useOldToken}` });
    return  res.json(user );
  } catch (error) {
    next(error);
  }
}

