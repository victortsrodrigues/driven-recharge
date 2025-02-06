import { Request, Response } from "express";
import { BodyRecharge } from "../protocols/phoneProtocols";
import rechargeServices from "../services/rechargeServices";

async function createRecharge(req: Request, res: Response) {
  const body = req.body as BodyRecharge;
  const rechargeCreated = await rechargeServices.createRecharge(body);
  res.status(201).send(rechargeCreated);
}

async function getRechargesByNumber(req: Request, res: Response) {
  const { number } = req.params;
  const recharges = await rechargeServices.getRechargesByNumber(number);
  res.status(200).send(recharges);
}

const rechargeController = {
  createRecharge,
  getRechargesByNumber,
};

export default rechargeController;
