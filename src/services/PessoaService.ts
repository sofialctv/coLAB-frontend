import PessoaRepository from '../models/Repositories/PessoaRepository';
import type { IPessoaResponse, IPessoaRequest } from '../models/Entities/Pessoa';

export default class PessoaService {
  private pessoaRepository: PessoaRepository;

  constructor() {
    this.pessoaRepository = new PessoaRepository();
  }

  async getAll(id?: number): Promise<IPessoaResponse[]> {
    try {
      if (id !== undefined) {
        return await this.pessoaRepository.fetchPessoa_s(id);
      }
      return await this.pessoaRepository.fetchPessoa_s();
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar pessoas.");
    }
  }

  async create(form: IPessoaRequest) {
    try {
      if (!form.Nome || !form.Email) {
        throw new Error("Nome e Email são obrigatórios.");
      }
      return await this.pessoaRepository.createPessoa(form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar pessoa.");
    }

  }

  async update(Id: number, form: IPessoaRequest) {
    try {
      const pessoaExiste = await this.pessoaRepository.fetchPessoa_s();
      if (!pessoaExiste.find(p => p.Id === Id)) {
        throw new Error("Pessoa não encontrada.");
      }
      return await this.pessoaRepository.updatePessoa(Id, form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar pessoa.");
    }

  }

  async delete(Id: number) {
    try {
      return await this.pessoaRepository.deletePessoa(Id);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar pessoa.");

    }

  }

  /*
  async getHistoricosCargo(Id: number): Promise<IHistoricoCargo[]> {
    return await this.pessoaRepository.getHistoricosCargo(Id);
  }
  */


}
