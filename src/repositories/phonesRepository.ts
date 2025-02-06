import db from "../database/db";
import { BodyPhone, Carrier, Client, Phone } from "../protocols/phoneProtocols";

async function createClient(body: BodyPhone) {
  const { cpf } = body;
  const result = await db.query<Client>(
    `INSERT INTO clients (cpf) VALUES ($1) RETURNING *`,
    [cpf]
  );
  const newClient = result.rows[0];
  return newClient;
}

async function createPhone(id: number, body: BodyPhone, carrier_id: number) {
  const { description, name, numbers } = body;
  const phonePromises = numbers.map((number) => {
    return db.query<Phone>(
      `INSERT INTO phones (client_id, carrier_id, name, description, number) VALUES ($1, $2, $3, $4, $5)`,
      [id, carrier_id, name, description, number]
    );
  });
  await Promise.all(phonePromises);
}

async function searchClientByCPF(cpf: string) {
  const clientExists = await db.query<Client>(
    `SELECT * FROM clients WHERE cpf=$1;`,
    [cpf]
  );
  return clientExists;
}

async function searchPhonesByClientId(id: number) {
  const clientPhones = await db.query<Client>(
    `SELECT * FROM phones WHERE client_id=$1;`,
    [id]
  );
  return clientPhones;
}

async function searchCarrierByCode(carrier: number) {
  const carrierExists = await db.query<Carrier>(
    `SELECT * FROM carriers WHERE code=$1;`,
    [carrier]
  );
  return carrierExists;
}

async function searchPhoneByNumber(numbers:string[]) {
  const phonePromises = numbers.map((number) => {
    return db.query<Phone>(`SELECT * FROM phones WHERE number=$1;`, [number]);
  });
  const phonesFound = await Promise.all(phonePromises);
  return phonesFound;
}

const phonesRepository = {
  searchCarrierByCode,
  searchPhoneByNumber,
  searchClientByCPF,
  createClient,
  createPhone,
  searchPhonesByClientId
};

export default phonesRepository;
