import api from '@/api/api';
import type { IPessoaResponse, IPessoaRequest } from '../Entities/Pessoa';
import PessoaRoutes from '../ApiRoutes/PessoaRoutes';
import { type IHistoricoCargo } from '../Entities/HistoricoCargo';

export default class PessoaRepository {
  apiClient;

  constructor() {
    this.apiClient = api;
  };

  createBaseRoute() {
    return new PessoaRoutes({}).getAll;
  };

  createDeleteRoute(id: number) {
    return new PessoaRoutes({ id: id }).delete;
  };

  async fetchPessoa_s() {
    try {
      const baseRoute = this.createBaseRoute();

      // Faz a request usando a API com o axios
      const response = await this.apiClient.get(baseRoute)

      console.log("Resposta bruta da API:\n\n\n\n", response.data);

      if (!Array.isArray(response.data.$values)) {
        throw new Error("Formato de dados inválido: esperado um array de pessoas.");
      }

      // Retorna a função com a criação de objetos
      return response.data.$values.map((pessoa: IPessoaResponse) => {
        const { id, nome, email, telefone, cpf, cargoNome, bolsaNome, historicosCargo } = pessoa;

        const cargoAtual = historicosCargo ? this.getCargoAtual(historicosCargo) : "Sem cargo";

        return {
          id,
          nome,
          email,
          telefone,
          cpf,
          cargoNome,
          bolsaNome,
          historicosCargo
        };
      });

    } catch (error) {
      const err = error as any;
      if (err.response) {
        console.error("Erro na resposta da API:", err.response.status, err.response.data);
      } else if (err.request) {
        console.error("Erro na requisição:", err.request);
      } else {
        console.error("Erro ao configurar a requisição:", err.message);
      }
      throw error;
    }
  }

  async createPessoa(form: IPessoaRequest) {
    try {
      const baseRoute = this.createBaseRoute()
      const response = await this.apiClient.post(baseRoute, form)

      return response; // Retorna a resposta do backend

    } catch (error) {
      console.error("Erro ao criar pessoa.", error);
      throw error;
    }
  }

  async updatePessoa(Id: number, form: IPessoaRequest) {
    try {
      const baseRoute = this.createBaseRoute()
      form.Id = Id;
      const response = await this.apiClient.put(`${baseRoute}/${Id}`, form);

      return response;

    } catch (error) {
      console.error("Erro ao atualizar pessoa.", error);
      throw error;
    }
  }

  async deletePessoa(Id: number) {
    try {
      const deleteRoute = this.createDeleteRoute(Id)
      const response = await this.apiClient.delete(deleteRoute)

      return response;

    } catch (error) {
      console.error("Erro ao deletar a pessoa.", error);
      throw error;
    }
  }

  getCargoAtual(historicosCargo: IHistoricoCargo[]): string {
    const ultimoCargo = historicosCargo
      .filter((historicosCargo) => !historicosCargo.DataFim)
      .sort(
        (a, b) =>
          new Date(b.DataInicio).getTime() - new Date(a.DataInicio).getTime()
      );

    return ultimoCargo[0]?.Cargo.Nome || "Sem cargo";
  }

  /*
  async getHistoricosCargo(Id: number): Promise<IHistoricoCargo[]> {
    try {
      const baseRoute = this.createBaseRoute()
      const response = await api.get<IPessoa>(baseRoute);

      return response.data.HistoricosCargo ?? [];

    } catch (error) {
      console.error("Erro ao buscar históricos de cargo: ", error);
      throw Error;
    }
  }
  */

}
