export type BodyPhone = {
  cpf: string;
  carrier: number;
  name: string;
  description: string;
  numbers: string[];
};

export type Client = {
  id: number;
  cpf: string;
};

export type Phone = Omit<BodyPhone, "cpf" | "carrier"> & {
  id: number;
  client_id: number;
  carrier_id: number;
};

export type Carrier = {
  id: number;
  name: string;
  code: number;
};

export type CustomError = Error & { type?: string };

export type BodyRecharge = {
  number: string;
  value: number;
};

export type Recharge = Omit<BodyRecharge, "number"> & {
  id: number;
  phone_id: number;
};

export type PhoneData = {
  number: Phone;
  carrier: Carrier;
  recharges: Recharge[];
};

export type Summary = {
  document: string;
  phones: PhoneData[];
};