import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import errorMiddleware from './middlewares/error.middleware';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

errorMiddleware(app);

app.listen(3000, () => {
  console.info(`Server started on port ${3000}`);
});
