import api from '@/api/api';
import type { IBolsa } from '../Entities/Bolsa';
import { Bolsa } from '../Entities/Bolsa';
import BolsaRoutes from '../ApiRoutes/BolsaRoutes';

export default class BolsaRepository {
  apiClient;

  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new BolsaRoutes({}).getAll;
  }

  createDeleteRoute(id: number) {
    return new BolsaRoutes({ id: id }).delete;
  }

  async fetchAllBolsa() {
    try {
      const baseRoute = this.createBaseRoute();
      const response = await this.apiClient.get(baseRoute);

      console.log("Resposta bruta da API:\n\n\n\n", response.data); // 🚨 Verifique o formato aqui

      return response.data.$values ? response.data.$values.map((bolsa: any) => {
        return new Bolsa(
          bolsa.id,
          bolsa.nome,
          bolsa.planoTrabalho,
          bolsa.valor,
          bolsa.dataInicio,
          bolsa.dataFim,
          bolsa.dataPrevistaFim,
          bolsa.ativo,
          bolsa.pessoaId,
          bolsa.pessoaNome,
          bolsa.projetoId,
          bolsa.projetoNome,
          bolsa.escolaridade
        );
      }) : response.data; // 🚀 Caso os dados venham direto
    } catch (error) {
      console.error('Erro ao buscar bolsas.', error);
      throw error;
    }
  }


  async createBolsa(form: IBolsa) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz o post usando a API com axios e enviando os dados
      const response = await this.apiClient.post(baseRoute, form);

      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error('Erro ao criar bolsa.', error);
      throw error;
    }
  }

  async updateBolsa(id: number, form: IBolsa) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Garante que o Id está salvo dentro do form
      form.Id = id;

      // Faz o put usando a API com axios e enviando os dados
      const response = await this.apiClient.put(`${baseRoute}/${id}`, form);

      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error('Erro ao atualizar bolsa', error);
      throw error;
    }
  }

  async deleteBolsa(id: number) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(id);

      // Faz o delete usando a API com axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);

      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error('Erro ao deletar a bolsa', error);
      throw error;
    }
  }
}
