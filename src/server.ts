import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { HttpStatus } from '@common/utils/systemConstants';
import AppException from '@common/exceptions/AppException';
import routes from '@routes/index';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppException) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  } else {
    console.log(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

app.listen(process.env.APP_PORT || 3333, () => {
  console.log(`Server started on port ${process.env.APP_PORT || 3333}!`);
});
