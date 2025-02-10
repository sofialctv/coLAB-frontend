import api from '@/api/api';
import { Financiador, IFinanciador } from '../Entities/Financiador';
import FinanciadorRoutes from '../ApiRoutes/FinanciadorRoutes';

export default class FinanciadorRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new FinanciadorRoutes({}).getAll;
  }

  createDeleteRoute(id: number) {
    return new FinanciadorRoutes({ id: id }).delete;
  }

  async fetchAllFinanciador() {
    try {
      // Criar rota de conex�o
      const baseRoute = this.createBaseRoute();

      // Faz a request usando a api com o axios
      const response = await this.apiClient.get(baseRoute);

      // Retorna a fun��o com a cria��o de objetos
        return response.data.value.map((financiador: IFinanciador) =>
        new Financiador (
          financiador.Id,
          financiador.Nome,
          financiador.Email
        ));

    } catch (error) {
      console.error("Erro ao buscar financiadores.", error);
      throw error;
    }
  }

    async createFinanciador(form: IFinanciador) {
    try {
      // Criar rota de conex�o
      const baseRoute = this.createBaseRoute();

      // Faz o post usando a api com o axios e enviando os dados
      const response = await this.apiClient.post(baseRoute, form);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao criar financiador.", error);
      throw error;
    }
  }

    async updateFinanciador(Id: number, form: IFinanciador) {
    try {
      // Criar rota de conex�o
      const baseRoute = this.createBaseRoute();

      // Garante que o Id est� salvo dentro do form
      form.Id = Id;

      // Faz o put usando a api com o axios e enviando os dados
      const response = await this.apiClient.put(baseRoute, form);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao atualizar financiador.", error);
      throw error;
    }
  }

  async deleteFinanciador(Id: number) {
    try {
      // Criar rota de conex�o
      const deleteRoute = this.createDeleteRoute(Id);

      // Faz o delete usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao deletar o financiador.", error);
      throw error;
    }
  }
}
