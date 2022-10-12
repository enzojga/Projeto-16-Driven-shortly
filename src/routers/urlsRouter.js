import express from 'express';
import { shortenUrl, getUrlId } from '../controllers/urlsController.js';
import { verifyToken } from '../middlewares/tokenMiddleware.js';

const urlsRouter = express.Router();

urlsRouter.post("/urls/shorten", verifyToken, shortenUrl);
urlsRouter.get("/urls/:id", getUrlId);

export { urlsRouter }