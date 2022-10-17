import express from 'express';
import cors from 'cors';
import loginRouter from './routers/loginRoutes.js';
import { urlsRouter } from './routers/urlsRouter.js';
import usersRouter from './routers/usersRoutes.js';
import rankingRouter from './routers/rankingRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(loginRouter);
app.use(urlsRouter);
app.use(usersRouter);
app.use(rankingRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Ouvindo porta ${port}`)});