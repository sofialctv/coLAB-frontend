import FinanciadorRepository from '../models/Repositories/FinanciadorRepository';
import type { IFinanciador } from '../models/Entities/Financiador';

export default class FinanciadorService {
  private financiadorRepository: FinanciadorRepository;

  constructor() {
    this.financiadorRepository = new FinanciadorRepository();
  }

  async getAll(): Promise<IFinanciador[]> {
    return await this.financiadorRepository.fetchAllFinanciador();
  }

  async create(form: IFinanciador) {
    if (!form.Nome || !form.Email) {
      throw new Error("Nome e Email são obrigatórios.");
    }
    return await this.financiadorRepository.createFinanciador(form);
  }

  async update(Id: number, form: IFinanciador) {
    const financiadorExiste = await this.financiadorRepository.fetchAllFinanciador();
    if (!financiadorExiste.find(f => f.Id === Id)) {
      throw new Error("Financiador não encontrado.");
    }
    return await this.financiadorRepository.updateFinanciador(Id, form);
  }

  async delete(Id: number) {
    return await this.financiadorRepository.deleteFinanciador(Id);
  }
}
