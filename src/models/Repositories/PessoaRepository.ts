import api from '@/api/api';
import type { IPessoa } from '../Entities/Pessoa';
import { Pessoa } from '../Entities/Pessoa';
import PessoaRoutes from '../ApiRoutes/PessoaRoutes';
import type { IHistoricoCargo } from '../Entities/HistoricoCargo';

export default class PessoaRepository {

  private pessoaRoutes = new PessoaRoutes();

  // Se um ID for passado ele chama o getById, se não, chama o getAll
  private createBaseRoute(Id?: number) : string {
    return Id ? this.pessoaRoutes.getById(Id) : this.pessoaRoutes.getAll();
  }

  async fetchPessoa_s() {
    try {
      const baseRoute = this.createBaseRoute();
      const response = await api.get(baseRoute);

      // Retorna a função com a criação de objetos
      return response.data.value.map((pessoa: IPessoa) =>
        new Pessoa(
          pessoa.Id,
          pessoa.Nome,
          pessoa.Email,
          pessoa.Telefone,
          pessoa.Cpf,
          pessoa.Bolsa,
          pessoa.HistoricosCargo
        ));

    } catch (error) {
      console.error("Erro ao buscar pessoas.", error);
      throw error;
    }
  }

  async createPessoa(form: IPessoa) {
    try {
      const baseRoute = this.pessoaRoutes.post();
      const response = await api.post(baseRoute, form);

      return response; // Retorna a resposta do backend

    } catch (error) {
      console.error("Erro ao criar pessoa.", error);
      throw error;
    }
  }

  async updatePessoa(Id: number, form: IPessoa) {
    try {
      const baseRoute = this.pessoaRoutes.update(Id);
      const response = await api.put(baseRoute, form);

      return response;

    } catch (error) {
      console.error("Erro ao atualizar pessoa.", error);
      throw error;
    }
  }

  async deletePessoa(Id: number) {
    try {
      const baseRoute = this.pessoaRoutes.delete(Id);
      const response = await api.delete(baseRoute);

      return response;

    } catch (error) {
      console.error("Erro ao deletar a pessoa.", error);
      throw error;
    }
  }

  async getHistoricosCargo(Id: number): Promise<IHistoricoCargo[]> {
    try {
      const baseRoute = this.pessoaRoutes.getById(Id)
      const response = await api.get<IPessoa>(baseRoute);

      return response.data.HistoricosCargo ?? [];

    } catch (error) {
      console.error("Erro ao buscar históricos de cargo: ", error);
      throw Error;
    }
  }
}
