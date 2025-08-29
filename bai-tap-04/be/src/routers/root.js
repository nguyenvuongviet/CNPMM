import express from "express";
import authRouter from "./auth";

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  res.json({ message: 'Chào mừng bạn tới với trang web của nvv' });
});

rootRouter.use(`/auth`, authRouter);

export default rootRouter;
