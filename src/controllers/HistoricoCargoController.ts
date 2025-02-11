import HistoricoCargoService from '@/services/HistoricoCargoService';
import type { IHistoricoCargoRequest } from '../models/Entities/HistoricoCargo';

export default class HistoricoCargoController {

  private historicoCargoService = new HistoricoCargoService();

  async getAll() {
    try {
      return await this.historicoCargoService.getAll();
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar históricos de cargo.");
    }
  }

  async create(form: IHistoricoCargoRequest) {
    try {
      return await this.historicoCargoService.create(form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar histórico de cargo.");
    }
  }

  async update(Id: number, item: IHistoricoCargoRequest) {
    try {
      return await this.historicoCargoService.update(Id, item);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar histórico de cargo.");
    }
  }

  async delete(Id: number) {
    try {
      return await this.historicoCargoService.delete(Id);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar histórico de cargo.");
    }
  }
}
