import { Request, Response } from "express";
import { BodyPhone } from "../protocols/phoneProtocols";
import phonesServices from "../services/phonesServices";

async function createPhone(req: Request, res: Response) {
  const body = req.body as BodyPhone;
  await phonesServices.createPhone(body);
  res.status(201).send("Created");
}

async function getPhonesByCPF(req: Request, res: Response) {
  const {document} = req.params;
  const phones = await phonesServices.getPhonesByCPF(document);
  res.status(200).send(phones);
}

const phonesController = {
  createPhone,
  getPhonesByCPF,
};

export default phonesController;
