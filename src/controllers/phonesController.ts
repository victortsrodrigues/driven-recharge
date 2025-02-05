import { Request, Response } from "express";
import { BodyPhone } from "protocols/phoneProtocols";
import phonesServices from "services/phonesServices";

async function createPhone(req: Request, res: Response) {
  const body = req.body as BodyPhone;
  await phonesServices.createPhone(body);
}

const phonesController = {
  createPhone,
};

export default phonesController;
