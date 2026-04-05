import express from "express";
import { validateRequest } from "../middleware/validate";
import { mobileSuitSchemas } from "../validation/mobileSuitSchemas";

const mobileSuitRouter = express.Router();

mobileSuitRouter.post(
    "/mobile-suits",
    validateRequest(mobileSuitSchemas.create)
);

export default mobileSuitRouter;