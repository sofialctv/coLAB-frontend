import api from '@/api/api';
import { HistoricoCargoResponse, type IHistoricoCargoRequest } from '../Entities/HistoricoCargo';
import HistoricoCargoRoutes from '../ApiRoutes/HistoricoCargoRoutes';

export default class HistoricoCargoRepository {
  apiClient;

  constructor() {
    this.apiClient = api;
  };

  createBaseRoute() {
    return new HistoricoCargoRoutes({}).getAll;
  };

  createDeleteRoute(id: number) {
    return new HistoricoCargoRoutes({ id: id }).delete;
  };

  async fetchHistoricoCargo_s() {
    try {
      const baseRoute = this.createBaseRoute();
      const response = await this.apiClient.get(baseRoute);

      // Retorna a função com a criação de objetos
      return response.data.$values.map((historicoCargo: any) => {
        return new HistoricoCargoResponse(
          historicoCargo.id,
          historicoCargo.data_inicio,
          historicoCargo.data_fim,
          historicoCargo.descricao,
          historicoCargo.pessoaNome,
          historicoCargo.cargoNome
        );
      });

    } catch (error) {
      console.error("Erro ao buscar históricos de cargo.", error);
      throw error;
    }
  }

  async createHistoricoCargo(form: IHistoricoCargoRequest) {
    try {
      const baseRoute = this.createBaseRoute();
      const response = await this.apiClient.post(baseRoute, form);

      return response; // Retorna a resposta do backend

    } catch (error) {
      console.error("Erro ao criar histórico de cargo.", error);
      throw error;
    }
  }

  async updateHistoricoCargo(Id: number, form: IHistoricoCargoRequest) {
    try {
      const baseRoute = this.createBaseRoute();
      form.Id = Id;
      const response = await this.apiClient.put(`${baseRoute}/${Id}`, form);

      return response;

    } catch (error) {
      console.error("Erro ao atualizar histórico de cargo.", error);
      throw error;
    }
  }

  async deleteHistoricoCargo(Id: number) {
    try {
      const baseRoute = this.createDeleteRoute(Id);
      const response = await this.apiClient.delete(baseRoute);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao deletar o histórico de cargo.", error);
      throw error;
    }
  }
}
