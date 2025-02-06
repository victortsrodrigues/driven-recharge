import { validateSchema } from "../middlewares/schemaMiddleware";
import phonesController from "../controllers/phonesController";
import { Router } from "express";
import phonesSchema from "../schemas/phonesSchema";

const phonesRouter = Router();

phonesRouter.post("/phones", validateSchema(phonesSchema), phonesController.createPhone);
phonesRouter.get("/phones/:document", phonesController.getPhonesByCPF);

export default phonesRouter;
