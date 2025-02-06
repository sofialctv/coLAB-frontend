import useApi from '../../composables/UseApi';

export default function serviceFactory(apiUrl: string) {
  return useApi(apiUrl); // retorna um objeto com { getAll, getById, post, update, remove }
}

