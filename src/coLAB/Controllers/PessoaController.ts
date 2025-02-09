import type { IPessoa } from '../Models/Entities/Pessoa';
import PessoaService from '../Services/PessoaService';

export default class PessoaController {

  private pessoaService = new PessoaService();

  async getAll() {
    return await this.pessoaService.getAll();
  }

  async create(form: IPessoa) {
    return await this.pessoaService.create(form);
  }

  async update(Id: number, item: IPessoa) {
    return await this.pessoaService.update(Id, item);
  }

  async delete(Id: number) {
    return await this.pessoaService.delete(Id);
  }

  async getHistoricosCargo(Id: number) {
    return await this.pessoaService.getHistoricosCargo(Id);
  }
}
