import type { ITipoBolsa } from '../models/Entities/TipoBolsa';
import TipoBolsaRepository from '../models/Repositories/TipoBolsaRepository';

export default class PessoaController {
  TipoBolsaRepository;
  constructor() {
    this.TipoBolsaRepository = new TipoBolsaRepository();
  }

  async getAll() {
    return await this.TipoBolsaRepository.fetchAllTipoBolsa();
  }

  async create(form: ITipoBolsa) {
    return await this.TipoBolsaRepository.createTipoBolsa(form);
  }

  async update(Id: number, item: ITipoBolsa) {
    return await this.TipoBolsaRepository.updateTipoBolsa(Id, item);
  }

  async delete(Id: number) {
    return await this.TipoBolsaRepository.deleteTipoBolsa(Id);
  }
}
