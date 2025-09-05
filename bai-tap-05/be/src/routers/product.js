import express from "express";
import protect from "../common/middlewares/protect";
import { pinController } from "../controllers/product";

const pinRouter = express.Router();

pinRouter.get("/", pinController.findAll);
pinRouter.get("/:id", pinController.findOne);

pinRouter.get("/:id/comments", pinController.getCommentsByPinId);
pinRouter.get("/:id/saved", protect, pinController.checkSavedPin);
pinRouter.post("/:id/comments", protect, pinController.createComment);

export default pinRouter;
