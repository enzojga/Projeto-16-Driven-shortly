import express from 'express';
import cors from 'cors';
import loginRouter from './routers/loginRoutes.js';
import { urlsRouter } from './routers/urlsRouter.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(loginRouter);
app.use(urlsRouter);

app.listen(5000, () => {console.log("Ouvindo na porta 5000")});