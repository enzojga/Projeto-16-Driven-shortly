import express from 'express';
import { signUp, signIn } from '../controllers/loginController.js';
import { signInValidator, signUpValidator } from '../middlewares/validationMiddleware.js';

const loginRouter = express.Router();

loginRouter.post("/signup", signUpValidator ,signUp);
loginRouter.post("/signin", signInValidator, signIn);

export default loginRouter;