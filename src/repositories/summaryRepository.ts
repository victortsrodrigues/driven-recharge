import db from "../database/db";
import { Carrier, Recharge } from "../protocols/phoneProtocols";

async function searchCarrierById(carrier_id: number) {
  const carrier = await db.query<Carrier>(
    `SELECT * FROM carriers WHERE id=$1;`,
    [carrier_id]
  );
  return carrier.rows[0];
}

async function searchRechageByPhoneId(id: number) {
  const phoneRecharges = await db.query<Recharge>(
    `SELECT * FROM recharges WHERE phone_id=$1;`,
    [id]
  );
  return phoneRecharges.rows;
}

const summaryRepository = {
  searchCarrierById,
  searchRechageByPhoneId,
};

export default summaryRepository;
