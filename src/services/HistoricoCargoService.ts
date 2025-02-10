import HistoricoCargoRepository from '../models/Repositories/HistoricoCargoRepository';
import type { IHistoricoCargo } from '../models/Entities/HistoricoCargo';

export default class HistoricoCargoService {
  private historicoCargoRepository: HistoricoCargoRepository;

  constructor() {
    this.historicoCargoRepository = new HistoricoCargoRepository();
  }

  async getAll(): Promise<IHistoricoCargo[]> {
    return await this.historicoCargoRepository.fetchHistoricoCargo_s();
  }

  async create(form: IHistoricoCargo) {
    if (!form.Descricao || !form.Cargo || !form.Pessoa) {
      throw new Error("Descrição, Cargo e Pessoa são obrigatórios.");
    }
    return await this.historicoCargoRepository.createHistoricoCargo(form);
  }

  async update(Id: number, form: IHistoricoCargo) {
    const historicoExiste = await this.historicoCargoRepository.fetchHistoricoCargo_s();
    if (!historicoExiste.find(h => h.Id === Id)) {
      throw new Error("Histórico de Cargo não encontrado.");
    }
    return await this.historicoCargoRepository.updateHistoricoCargo(Id, form);
  }

  async delete(Id: number) {
    return await this.historicoCargoRepository.deleteHistoricoCargo(Id);
  }
}
