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

export type Phone = Omit<BodyPhone, "cpf"> & {
  id: number;
};

export type Carrier = {
  id: number;
  name: string;
  code: number;
};

export type CustomError = Error & { type?: string };