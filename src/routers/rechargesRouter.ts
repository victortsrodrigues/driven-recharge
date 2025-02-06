import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import rechargeSchema from "../schemas/rechargeSchema";
import rechargeController from "../controllers/rechargeController";

const rechargesRouter = Router();

rechargesRouter.post("/recharges", validateSchema(rechargeSchema), rechargeController.createRecharge);
rechargesRouter.get("/recharges/:number", rechargeController.getRechargesByNumber);

export default rechargesRouter;
