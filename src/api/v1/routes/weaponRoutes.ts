import express from "express";
import { validateRequest } from "../middleware/validate";
import * as weaponController from "../controllers/weaponController";
import { weaponSchemas } from "../validation/weaponSchemas";

const weaponRouter = express.Router();

weaponRouter.post(
    "/weapons",
    validateRequest(weaponSchemas.create),
    weaponController.createWeaponHandler
);

export default weaponRouter;