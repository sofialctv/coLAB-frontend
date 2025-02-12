import type { IFinanciador } from '../models/Entities/Financiador';
import FinanciadorRepository from '../models/Repositories/FinanciadorRepository';
import FinanciadorService from '../services/FinanciadorService';

export default class FinanciadorController {
  FinanciadorRepository;
  FinanciadorService;
  constructor() {
    this.FinanciadorRepository = new FinanciadorRepository();
    this.FinanciadorService = new FinanciadorService();
  }

  async getAll() {
    return await this.FinanciadorService.getAll();
  }

  async create(form: IFinanciador) {
    return await this.FinanciadorService.create(form);
  }

  async update(Id: number, item: IFinanciador) {
    return await this.FinanciadorService.update(Id, item);
  }

  async delete(Id: number) {
    return await this.FinanciadorService.delete(Id);
  }
}
