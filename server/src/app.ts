require('dotenv').config();
require('./db');
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
const authRouter = require('./auth/authRouter');
import * as middlewares from './middlewares';
import MessageResponse from './interfaces/MessageResponse';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/', authRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
export default app;
