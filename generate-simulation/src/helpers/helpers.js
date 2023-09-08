import { date } from 'quasar';

const FormatarNumero = (numero) => {
  // Remove os carácteres não números.
  return numero.replace(/\D/g, '');
};

const FormatarData = (data, formato = 'DD/MM/YYYY') => {
  return data ? date(data).format(formato) : '';
};

const NormalizarNome = (string) => {
  // remove acentos e passa tudo para lowercase para poder comparar
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const OrdenarLista = (lista, campo = 'descricao', desc = false) => {
  lista.sort((a, b) => {
    if (NormalizarNome(a[campo]) < NormalizarNome(b[campo]))
      return desc ? 1 : -1;
    if (NormalizarNome(a[campo]) > NormalizarNome(b[campo]))
      return desc ? -1 : 1;
    return 0;
  });
  return lista;
};

const GetErrorMessage = (error) => {
  const errorData = error.response && error.response.data;
  const errorMessage =
    (errorData && (errorData.mensagem || errorData.message)) ||
    'Não foi possível completar a operação';
  const errorFields = (error.response && errorData.errors) || {};
  const fieldsMessage = Object.values(errorFields).join('\n');

  const finalMessage = fieldsMessage
    ? errorMessage + '\n' + fieldsMessage
    : errorMessage;

  return finalMessage;
};

export {
  FormatarNumero,
  FormatarData,
  NormalizarNome,
  OrdenarLista,
  GetErrorMessage,
};
