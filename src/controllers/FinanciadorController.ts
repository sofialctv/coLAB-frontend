import { IFinanciador } from '../models/Entities/Financiador';
import FinanciadorRepository from '../models/Repositories/FinanciadorRepository';

export default class FinanciadorController {
  FinanciadorRepository;
  constructor() {
    this.FinanciadorRepository = new FinanciadorRepository();
  }

  async getAll() {
    return await this.FinanciadorRepository.fetchAllFinanciador();
  }

  async create(form: IFinanciador) {
    return await this.FinanciadorRepository.createFinanciador(form);
  }

  async update(Id: number, item: IFinanciador) {
    return await this.FinanciadorRepository.updateFinanciador(Id, item);
  }

  async delete(Id: string) {
    return await this.FinanciadorRepository.deleteFinanciador(Id);
  }
}
