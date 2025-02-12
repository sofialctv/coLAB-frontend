import type { IBolsaRequest } from '../models/Entities/Bolsa';
import BolsaService from '../services/BolsaService';

export default class BolsaController {
  private bolsaService: BolsaService;

  constructor() {
    this.bolsaService = new BolsaService();
  }

  async getAll() {
    return await this.bolsaService.getAllBolsa();
  }

  async create(form: IBolsaRequest) {
    return await this.bolsaService.createBolsa(form);
  }

  async update(id: number, form: IBolsaRequest) {
    return await this.bolsaService.updateBolsa(id, form);
  }

  async delete(id: number) {
    return await this.bolsaService.deleteBolsa(id);
  }
}
