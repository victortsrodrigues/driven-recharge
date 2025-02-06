import { Phone, Recharge } from "../protocols/phoneProtocols";
import db from "../database/db";

async function searchPhoneByNumber(number: string) {
  const phonesFound = await db.query<Phone>(
    `SELECT * FROM phones WHERE number=$1;`,
    [number]
  );
  return phonesFound;
}

async function createRecharge(phone_id: number, value: number) {
  const rechargeCreated = await db.query<Recharge>(
    `INSERT INTO recharges (phone_id, value) VALUES ($1, $2) RETURNING *`,
    [phone_id, value]
  );
  return rechargeCreated.rows[0];
}

async function searchRechageByPhoneId(id:number) {
  const phoneRecharges = await db.query<Recharge>(
    `SELECT * FROM recharges WHERE phone_id=$1;`,
    [id]
  );
  return phoneRecharges;
}

const rechargeRepository = {
  searchPhoneByNumber,
  createRecharge,
  searchRechageByPhoneId,
};

export default rechargeRepository;
