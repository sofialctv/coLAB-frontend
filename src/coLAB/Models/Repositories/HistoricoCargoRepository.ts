import api from '@/services/api';
import { HistoricoCargo, IHistoricoCargo } from '../Entities/HistoricoCargo';
import HistoricoCargoRoutes from './ApiRoutes/HistoricoCargoRoutes';

export default class HistoricoCargoRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new HistoricoCargoRoutes({}).getAll;
  }

  createDeleteRoute(id: number) {
    return new HistoricoCargoRoutes({ id: id }).delete;
  }

  async fetchAllHistoricoCargo() {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz a request usando a api com o axios
      const response = await this.apiClient.get(baseRoute);

      // Retorna a função com a criação de objetos
      return response.data.value.map((historicoCargo: IHistoricoCargo) =>
        new HistoricoCargo(
          historicoCargo.Id,
          historicoCargo.DataInicio,
          historicoCargo.DataFim,
          historicoCargo.Descricao,
          historicoCargo.Cargo,
          historicoCargo.Pessoa
        ));

    } catch (error) {
      console.error("Erro ao buscar históricos de cargo.", error);
      throw error;
    }
  }

  async createHistoricoCargo(form: IHistoricoCargo) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz o post usando a api com o axios e enviando os dados
      const response = await this.apiClient.post(baseRoute, form);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao criar histórico de cargo.", error);
      throw error;
    }
  }

  async updateHistoricoCargo(Id: number, form: IHistoricoCargo) {
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
      console.error("Erro ao atualizar histórico de cargo.", error);
      throw error;
    }
  }

  async deleteHistoricoCargo(Id: number) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(Id);

      // Faz o delete usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao deletar o histórico de cargo.", error);
      throw error;
    }
  }
}