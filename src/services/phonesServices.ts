import phonesRepository from "../repositories/phonesRepository";
import { BodyPhone } from "../protocols/phoneProtocols";
import { conflictError } from "../errors/conflictError";
import { notFoundError } from "../errors/notFoundError";

async function createPhone(body: BodyPhone) {
  const { carrier, numbers, cpf } = body;

  // Wrong carrier:
  const carrierExists = await phonesRepository.searchCarrierByCode(carrier);
  if (carrierExists.rowCount === 0) throw notFoundError("Carrier");

  // Number already registered
  const phoneExists = await phonesRepository.searchPhoneByNumber(numbers);
  phoneExists.forEach((phone) => {
    if (phone.rowCount !== 0) throw conflictError("Phone number");
  });

  const carrier_id = carrierExists.rows[0].id;
  const clientExists = await phonesRepository.searchClientByCPF(cpf);
  // CPF not registred yet
  if (clientExists.rowCount === 0) {
    const { id } = await phonesRepository.createClient(body);
    const phonesCreated = await phonesRepository.createPhone(id, body, carrier_id);
    return phonesCreated;
  } else {
    // CPF already registred
    // Check how many numbers the CPF already has
    const id = clientExists.rows[0].id;
    const phonesExistingClient = await phonesRepository.searchPhonesByClientId(id);
    if (phonesExistingClient.rowCount >= 3)
      throw conflictError("All possible phones");

    const phonesCreated = await phonesRepository.createPhone(id, body, carrier_id);
    return phonesCreated;
  }
}

async function getPhonesByCPF(cpf: string) {
  const clientExists = await phonesRepository.searchClientByCPF(cpf);
  if (clientExists.rowCount === 0) return [];
  const id = clientExists.rows[0].id;
  const phonesExistingClient = await phonesRepository.searchPhonesByClientId(id);
  return phonesExistingClient.rows;
}

const phonesServices = {
  createPhone,
  getPhonesByCPF,
};

export default phonesServices;
