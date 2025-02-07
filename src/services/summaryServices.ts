import { Carrier, Recharge, Summary } from "../protocols/phoneProtocols";
import { notFoundError } from "../errors/notFoundError";
import phonesRepository from "../repositories/phonesRepository";
import summaryRepository from "../repositories/summaryRepository";

async function getSummary(cpf: string) {
  const clientExists = await phonesRepository.searchClientByCPF(cpf);
  if (clientExists.rowCount === 0) throw notFoundError("CPF");

  const client_id = clientExists.rows[0].id;
  const phonesExistingClient = await phonesRepository.searchPhonesByClientId(
    client_id
  );
  const clientPhones = phonesExistingClient.rows;

  const clientCarrierPromises = clientPhones.map((phone) => {
    return summaryRepository.searchCarrierById(phone.carrier_id);
  });
  const clientCarrier = await Promise.all(clientCarrierPromises);

  const clientRechargePromises = clientPhones.map((phone) => {
    return summaryRepository.searchRechageByPhoneId(phone.id);
  });
  const clientRecharges = await Promise.all(clientRechargePromises);

  const getCarrierById = (carrierId: number): Carrier =>
    clientCarrier.find((carrier) => carrier.id === carrierId) as Carrier;

  const getRechargesByPhoneId = (phoneId: number): Recharge[] =>
    clientRecharges
      .flat()
      .filter((recharge: Recharge) => recharge.phone_id === phoneId);

  const summary: Summary = {
    document: cpf,
    phones: clientPhones.map((phone) => ({
      number: phone,
      carrier: getCarrierById(phone.carrier_id),
      recharges: getRechargesByPhoneId(phone.id),
    })),
  };
  return summary;
}

const summaryServices = {
  getSummary,
};

export default summaryServices;
