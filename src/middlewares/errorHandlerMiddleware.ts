import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { CustomError } from "../protocols/phoneProtocols";

export default function errorHandler(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  
  if (error.type === "conflict") {
    res.status(httpStatus.CONFLICT).send(error.message);
    return;
  }
  if (error.type === "notFound") {
    res.status(httpStatus.NOT_FOUND).send(error.message);
    return;
  }
  res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
