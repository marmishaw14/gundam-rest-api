import express from "express";
import { validateRequest } from "../middleware/validate";
import * as mobileSuitController from "../controllers/mobileSuitController";
import { mobileSuitSchemas } from "../validation/mobileSuitSchemas";

const mobileSuitRouter = express.Router();

mobileSuitRouter.post(
    "/mobile-suits",
    validateRequest(mobileSuitSchemas.create),
    mobileSuitController.createMobileSuitHandler
);

mobileSuitRouter.get(
    "/mobile-suits",
    mobileSuitController.getAllMobileSuitsHandler
);

export default mobileSuitRouter;