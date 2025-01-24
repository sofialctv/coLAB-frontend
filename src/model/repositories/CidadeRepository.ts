// src/repositories/ProductRepository.js
import api from '@/services/api';
import type { ICidade } from '../Cidade';
import { Cidade } from '../Cidade';
import CidadeRoutes from './apiRoutes/CidadeRoutes';

export default class CidadeRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new CidadeRoutes({}).entity;
  }

  createDeleteRoute(id: string) {
    return new CidadeRoutes({id: id}).delete;
  }

  async fetchAllCidade() {
    try {
        // Criar rota de conexão
        const baseRoute = this.createBaseRoute();

        // Faz a request usando a api com o axios
        const response = await this.apiClient.get(baseRoute);

        // Retorna a função com a criação de objetos
        return response.data.value.map((cidade: ICidade) => new Cidade(cidade.Id, cidade.Nome));
    } catch (error) {
      console.error("Erro ao buscar cidades", error);
      throw error;
    }
  }

  async createCidade(form: ICidade) {
    try {
        // Criar rota de conexão
        const baseRoute = this.createBaseRoute();

        // Faz o post usando a api com o axios e enviando os dados
        const response = await this.apiClient.post(baseRoute, form);

        // Retorna a resposta do backend
        return response;
    } catch (error) {
      console.error("Erro ao criar cidade", error);
      throw error;
    }
  }

  async updateCidade(Id: string, form: ICidade) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Garante que o Id está salvo dentro do form
      form.Id = Id;

      // Faz o put usando a api com o axios e enviando os dados
      const response = await this.apiClient.put(baseRoute, form);

      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error("Erro ao atualizar cidade", error);
      throw error;
    }
  }

  async deleteCidade(Id: string) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(Id);

      // Faz o put usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);

      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error("Erro ao deletar a cidade", error);
      throw error;
    }
  }
}
