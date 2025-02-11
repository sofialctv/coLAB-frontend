import HistoricoCargoRepository from '../models/Repositories/HistoricoCargoRepository';
import type { IHistoricoCargoRequest, IHistoricoCargoResponse } from '../models/Entities/HistoricoCargo';

export default class HistoricoCargoService {
  private historicoCargoRepository: HistoricoCargoRepository;

  constructor() {
    this.historicoCargoRepository = new HistoricoCargoRepository();
  }

  async getAll(): Promise<IHistoricoCargoResponse[]> {
    try {
      return await this.historicoCargoRepository.fetchHistoricoCargo_s();
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar históricos de cargo.");
    }
  }

  async create(form: IHistoricoCargoRequest) {
    try {
      if (!form.Descricao || !form.Cargo || !form.Pessoa) {
        throw new Error("Descrição, Cargo e Pessoa são obrigatórios.");
      }
      return await this.historicoCargoRepository.createHistoricoCargo(form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar histórico de cargo.");
    }
  }

  async update(Id: number, form: IHistoricoCargoRequest) {
    try {
      const historicoExiste = await this.historicoCargoRepository.fetchHistoricoCargo_s();
      if (!historicoExiste.find(h => h.Id === Id)) {
        throw new Error("Histórico de Cargo não encontrado.");
      }
      return await this.historicoCargoRepository.updateHistoricoCargo(Id, form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar histórico de cargo.");
    }

  }

  async delete(Id: number) {
    try {
      return await this.historicoCargoRepository.deleteHistoricoCargo(Id);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar histórico de cargo.");
    }
  }
}
