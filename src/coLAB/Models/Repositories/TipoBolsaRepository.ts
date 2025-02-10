import api from '@/services/api';
import type { ITipoBolsa } from '../Entities/TipoBolsa';
import { TipoBolsa } from '../Entities/TipoBolsa';
import TipoBolsaRoutes from './ApiRoutes/TipoBolsaRoutes';

export default class TipoBolsaRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new TipoBolsaRoutes({}).getAll;
  }

  createDeleteRoute(id: string) {
    return new TipoBolsaRoutes({ id: id }).delete;
  }

  async fetchAllTipoBolsa() {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz a request usando a api com o axios
      const response = await this.apiClient.get(baseRoute);

      // Retorna a função com a criação de objetos
      return response.data.value.map((tipoBolsa: ITipoBolsa) =>
        new TipoBolsa(
          tipoBolsa.Id,
          tipoBolsa.Nome,
          tipoBolsa.Descricao,
          tipoBolsa.Escolaridade
        ));
    } catch (error) {
      console.error("Erro ao buscar tipos de bolsas.", error);
      throw error;
    }
  }

  async createTipoBolsa(form: ITipoBolsa) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz o post usando a api com o axios e enviando os dados
      const response = await this.apiClient.post(baseRoute, form);

      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error("Erro ao criar tipo de bolsa.", error);
      throw error;
    }
  }

  async updateTipoBolsa(Id: string, form: ITipoBolsa) {
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
      console.error("Erro ao atualizar tipo de bolsa", error);
      throw error;
    }
  }

  async deleteTipoBolsa(Id: string) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(Id);

      // Faz o delete usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);

      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error("Erro ao deletar o tipo de bolsa", error);
      throw error;
    }
  }
}
