import { IHistoricoCargo } from '../Models/Entities/HistoricoCargo';
import HistoricoCargoRepository from '../Models/Repositories/HistoricoCargoRepository';

export default class HistoricoCargoController {
  historicoCargoRepository;
  constructor() {
    this.historicoCargoRepository = new HistoricoCargoRepository();
  }

  async getAll() {
    return await this.historicoCargoRepository.fetchHistoricoCargo_s();
  }

  async create(form: IHistoricoCargo) {
    return await this.historicoCargoRepository.createHistoricoCargo(form);
  }

  async update(Id: number, item: IHistoricoCargo) {
    return await this.historicoCargoRepository.updateHistoricoCargo(Id, item);
  }

  async delete(Id: number) {
    return await this.historicoCargoRepository.deleteHistoricoCargo(Id);
  }
}
