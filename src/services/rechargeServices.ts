import rechargeRepository from "../repositories/rechargeRepository";
import { BodyRecharge } from "../protocols/phoneProtocols";
import { notFoundError } from "../errors/notFoundError";

async function createRecharge(body: BodyRecharge) {
  const { number, value } = body;
  const numberExists = await rechargeRepository.searchPhoneByNumber(number);
  if (numberExists.rowCount === 0) throw notFoundError("Phone number");
  const { id } = numberExists.rows[0];
  const rechargeCreated = await rechargeRepository.createRecharge(id, value);
  return rechargeCreated;
}

async function getRechargesByNumber(number: string) {
  const numberExists = await rechargeRepository.searchPhoneByNumber(number);
  if (numberExists.rowCount === 0) throw notFoundError("Phone number");
  const { id } = numberExists.rows[0];
  const recharges = await rechargeRepository.searchRechageByPhoneId(id);
  if (recharges.rowCount === 0) return [];
  return recharges.rows;
}

const rechargeServices = {
  createRecharge,
  getRechargesByNumber,
};

export default rechargeServices;
