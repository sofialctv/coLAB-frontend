import api from '@/api/api';
import type { IHistoricoCargo } from '../Entities/HistoricoCargo';
import { HistoricoCargo } from '../Entities/HistoricoCargo';
import HistoricoCargoRoutes from '../ApiRoutes/HistoricoCargoRoutes';

export default class HistoricoCargoRepository {

  private historicoCargoRoutes = new HistoricoCargoRoutes();

  // Se um ID for passado ele chama o getById, se não, chama o getAll
  private createBaseRoute(Id?: number) : string {
    return Id ? this.historicoCargoRoutes.getById(Id) : this.historicoCargoRoutes.getAll();
  }


  async fetchHistoricoCargo_s() {
    try {
      const baseRoute = this.createBaseRoute();
      const response = await api.get(baseRoute);

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
      const baseRoute = this.historicoCargoRoutes.post();
      const response = await api.post(baseRoute, form);

      return response; // Retorna a resposta do backend

    } catch (error) {
      console.error("Erro ao criar histórico de cargo.", error);
      throw error;
    }
  }

  async updateHistoricoCargo(Id: number, form: IHistoricoCargo) {
    try {
      const baseRoute = this.historicoCargoRoutes.update(Id);
      const response = await api.put(baseRoute, form);

      return response;

    } catch (error) {
      console.error("Erro ao atualizar histórico de cargo.", error);
      throw error;
    }
  }

  async deleteHistoricoCargo(Id: number) {
    try {
      const baseRoute = this.historicoCargoRoutes.delete(Id);
      const response = await api.delete(baseRoute);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao deletar o histórico de cargo.", error);
      throw error;
    }
  }
}
