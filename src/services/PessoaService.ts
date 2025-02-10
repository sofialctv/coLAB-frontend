import PessoaRepository from '../models/Repositories/PessoaRepository';
import type { IPessoa } from '../models/Entities/Pessoa';
import type { IHistoricoCargo } from '../models/Entities/HistoricoCargo';

export default class PessoaService {
  private pessoaRepository: PessoaRepository;

  constructor() {
    this.pessoaRepository = new PessoaRepository();
  }

  async getAll(): Promise<IPessoa[]> {
    return await this.pessoaRepository.fetchPessoa_s();
  }

  async create(form: IPessoa) {
    if (!form.Nome || !form.Email) {
      throw new Error("Nome e Email são obrigatórios.");
    }
    return await this.pessoaRepository.createPessoa(form);
  }

  async update(Id: number, form: IPessoa) {
    const pessoaExiste = await this.pessoaRepository.fetchPessoa_s();
    if (!pessoaExiste.find(p => p.Id === Id)) {
      throw new Error("Pessoa não encontrada.");
    }
    return await this.pessoaRepository.updatePessoa(Id, form);
  }

  async delete(Id: number) {
    return await this.pessoaRepository.deletePessoa(Id);
  }

  async getHistoricosCargo(Id: number): Promise<IHistoricoCargo[]> {
    return await this.pessoaRepository.getHistoricosCargo(Id);
  }
}
