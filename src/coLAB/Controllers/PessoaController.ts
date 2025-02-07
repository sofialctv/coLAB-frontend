import { IPessoa } from '../Models/Entities/Pessoa';
import PessoaRepository from '../Models/Repositories/PessoaRepository';

export default class PessoaController {
  pessoaRepository;
  constructor() {
    this.pessoaRepository = new PessoaRepository();
  }

  async getAll() {
    return await this.pessoaRepository.fetchAllPessoa();
  }

  async create(form: IPessoa) {
    return await this.pessoaRepository.createPessoa(form);
  }

  async update(Id: number, item: IPessoa) {
    return await this.pessoaRepository.updatePessoa(Id, item);
  }

  async delete(Id: number) {
    return await this.pessoaRepository.deletePessoa(Id);
  }
}