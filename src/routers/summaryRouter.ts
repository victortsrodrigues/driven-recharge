import summaryController from "../controllers/summaryController";
import { Router } from "express";

const summaryRouter = Router();

summaryRouter.get("/summary/:document", summaryController.getSummary);

export default summaryRouter;
