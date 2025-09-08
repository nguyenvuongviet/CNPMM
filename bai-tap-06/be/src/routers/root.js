import express from "express";
import authRouter from "./auth";
import productRouter from "./product";

const rootRouter = express.Router();

rootRouter.use(`/auth`, authRouter);
rootRouter.use(`/product`, productRouter);


export default rootRouter;
