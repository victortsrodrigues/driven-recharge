import { Request, Response } from "express";
import summaryServices from "../services/summaryServices";

async function getSummary(req: Request, res: Response) {
  const { document } = req.params;
  const summary = await summaryServices.getSummary(document);
  res.status(200).send(summary);
}

const summaryController = {
  getSummary,
};

export default summaryController;
