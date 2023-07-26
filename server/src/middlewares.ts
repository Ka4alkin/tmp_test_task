import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './interfaces/ErrorResponse';
import { config } from './common/constants';
import { errorMessages } from './common/errors';
require('dotenv').config();
const jwt = require('jsonwebtoken');


export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.method === config.OPTIONS) next();
  if (!req.headers.authorization) return res.status(403).json({ message: errorMessages.headersAreEmpty });

  try {
    const token =  req.headers.authorization!.split(' ')[1];

    if (!token)  return res.status(403).json({ message: errorMessages.tokenDoesNoteExist });

    const decodedData = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decodedData;

  } catch (e) {
    return res.status(403).json({ message: errorMessages.checkAuthMiddlewareFailed });
  }

  next();
}



export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {

  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({ message: err.message, stack: err.stack });
}