import phonesController from "controllers/phonesController";
import { Router } from "express";

const phonesRouter = Router();

phonesRouter.post("/phones", phonesController.createPhone);

export default phonesRouter;
