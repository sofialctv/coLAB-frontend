import api from '@/services/api';
import { Pessoa, IPessoa } from '../Entities/Pessoa';
import PessoaRoutes from './ApiRoutes/PessoaRoutes';

export default class PessoaRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new PessoaRoutes({}).getAll;
  }

  createDeleteRoute(id: number) {
    return new PessoaRoutes({ id: id }).delete;
  }

  async fetchAllPessoa() {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz a request usando a api com o axios
      const response = await this.apiClient.get(baseRoute);

      // Retorna a função com a criação de objetos
      return response.data.value.map((pessoa: IPessoa) =>
        new Pessoa(
          pessoa.Id,
          pessoa.Nome,
          pessoa.Email,
          pessoa.Telefone,
          pessoa.Cpf,
          pessoa.Bolsa,
          pessoa.HistoricosCargo
        ));

    } catch (error) {
      console.error("Erro ao buscar pessoas.", error);
      throw error;
    }
  }

  async createPessoa(form: IPessoa) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz o post usando a api com o axios e enviando os dados
      const response = await this.apiClient.post(baseRoute, form);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao criar pessoa.", error);
      throw error;
    }
  }

  async updatePessoa(Id: number, form: IPessoa) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Garante que o Id está salvo dentro do form
      form.Id = Id;

      // Faz o put usando a api com o axios e enviando os dados
      const response = await this.apiClient.put(baseRoute, form);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao atualizar pessoa.", error);
      throw error;
    }
  }

  async deletePessoa(Id: number) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(Id);

      // Faz o delete usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao deletar a pessoa.", error);
      throw error;
    }
  }
}