import type { IPessoaRequest } from '../models/Entities/Pessoa';
import PessoaService from '../services/PessoaService';

export default class PessoaController {

  private pessoaService = new PessoaService();

  async getAll() {
    try {
      return await this.pessoaService.getAll();
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar pessoas.");
    }
  }

  async create(form: IPessoaRequest) {
    try {
      const response = await this.pessoaService.create(form);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar pessoa.");
    }
  }

  async update(Id: number, item: IPessoaRequest) {
    try {
      return await this.pessoaService.update(Id, item);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar pessoa.");
    }
  }

  async delete(Id: number) {
    try {
      return await this.pessoaService.delete(Id);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar pessoa.");
    }
  }

  /*
  async getHistoricosCargo(Id: number) {
    return await this.pessoaService.getHistoricosCargo(Id);
  }
  */
}
