import { IBolsa} from '../Models/Entities/Bolsa';
import BolsaRepository from '../Models/Repositories/BolsaRepository';

export default class PessoaController {
  BolsaRepository;
  constructor() {
    this.BolsaRepository = new BolsaRepository();
  }

  async getAll() {
    return await this.BolsaRepository.fetchAllTipoBolsa();
  }

  async create(form: IBolsa) {
    return await this.BolsaRepository.createTipoBolsa(form);
  }

  async update(Id: number, item: IBolsa) {
    return await this.BolsaRepository.updateTipoBolsa(Id, item);
  }

  async delete(Id: number) {
    return await this.BolsaRepository.deleteTipoBolsa(Id);
  }
}