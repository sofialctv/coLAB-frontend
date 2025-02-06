import api from '@/services/api';
import type { IBolsa } from './Bolsa';
import { Bolsa } from './Bolsa';
import BolsaRoutes from './apiRoutes/BolsaRoutes';

export default class BolsaRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new BolsaRoutes({}).getAll;
  }

  createDeleteRoute(id: string) {
    return new BolsaRoutes({ id: id }).delete;
  }

  async fetchAllBolsa() {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz a request usando a api com o axios
      const response = await this.apiClient.get(baseRoute);

      // Retorna a função com a criação de objetos
      return response.data.value.map((bolsa: IBolsa) =>
        new Bolsa(
          bolsa.Id,
          bolsa.Valor,
          bolsa.DataInicio,
          bolsa.DataFim,
          bolsa.DataPrevistaFim,
          bolsa.Ativo,
          bolsa.TipoBolsa,
          bolsa.Pessoa
        ));
    } catch (error) {
      console.error("Erro ao buscar bolsas.", error);
      throw error;
    }
  }

  async createBolsa(form: IBolsa) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz o post usando a api com o axios e enviando os dados
      const response = await this.apiClient.post(baseRoute, form);

      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error("Erro ao criar bolsa.", error);
      throw error;
    }
  }

  async updateBolsa(Id: string, form: IBolsa) {
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
      console.error("Erro ao atualizar bolsa", error);
      throw error;
    }
  }

  async deleteBolsa(Id: string) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(Id);

      // Faz o delete usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);

      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error("Erro ao deletar a bolsa", error);
      throw error;
    }
  }
}
