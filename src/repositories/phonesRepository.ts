async function createPhone() {
  // inserir o cpf na table clients e pegar o id criado com RETURNING
  // inserir o id e o restante dos dados do body na tabela phones
}

const phonesRepository = {
  createPhone,
};

export default phonesRepository;
