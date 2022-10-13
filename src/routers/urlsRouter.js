import express from 'express';
import { shortenUrl, getUrlId, openUrl, deleteUrl } from '../controllers/urlsController.js';
import { verifyToken } from '../middlewares/tokenMiddleware.js';

const urlsRouter = express.Router();

urlsRouter.post("/urls/shorten", verifyToken, shortenUrl);
urlsRouter.get("/urls/:id", getUrlId);
urlsRouter.get("/urls/open/:shortUrl", openUrl);
urlsRouter.delete("/urls/:id", verifyToken, deleteUrl);

export { urlsRouter }