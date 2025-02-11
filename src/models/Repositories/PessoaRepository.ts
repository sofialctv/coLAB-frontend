import api from '@/api/api';
import {  type IPessoaRequest, PessoaResponse } from '../Entities/Pessoa';
import PessoaRoutes from '../ApiRoutes/PessoaRoutes';

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
      const response = await this.apiClient.get(baseRoute); // Faz a request usando a API com o axios

      return response.data.$values.map((pessoa: any) => {
        const historicosCargoArray = pessoa.historicosCargo?.$values || [];

        const cargoAtual = historicosCargoArray ? this.getCargoAtual(historicosCargoArray) : "Sem cargo";

        return new PessoaResponse(
          pessoa.id,
          pessoa.nome,
          pessoa.email,
          pessoa.telefone,
          pessoa.cpf,
          cargoAtual,
          pessoa.bolsaNome,
          historicosCargoArray
        );
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

  getCargoAtual(historicosCargo: any[]): string {
    if (!historicosCargo || !Array.isArray(historicosCargo)) {
      return "Sem cargo";
    }

    const ultimoHistoricoCargo = historicosCargo
      .filter(
        (historicosCargo) =>
          !historicosCargo.data_fim || historicosCargo.data_fim === "0001-01-01T00:00:00"
      )
      .sort(
        (a, b) =>
          new Date(b.data_inicio).getTime() - new Date(a.data_inicio).getTime()
      );

    return ultimoHistoricoCargo[0]?.cargoNome || "Sem cargo";
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
