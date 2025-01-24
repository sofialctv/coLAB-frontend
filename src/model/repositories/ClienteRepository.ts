// src/repositories/ProductRepository.js
import api from '@/services/api';
import type { ICliente } from '../Cliente';
import { Cliente } from '../Cliente';
import ClienteRoutes from './apiRoutes/ClienteRoutes';

export default class ClienteRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new ClienteRoutes({}).entity;
  }
  
  createDeleteRoute(id: string) {
    return new ClienteRoutes({id: id}).delete;
  }

  async fetchAllCliente() {
    try {
        // Criar rota de conexão
        const baseRoute = this.createBaseRoute();
        
        // Faz a request usando a api com o axios
        const response = await this.apiClient.get(baseRoute);
        
        // Retorna a função com a criação de objetos
        return response.data.value.map((cliente: ICliente) => new Cliente(cliente.Id, cliente.Nome, cliente.Telefone, cliente.Cpf, cliente.CidadeId));
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
      return [];
    }
  }

  async createCliente(form: ICliente) {
    try {
        // Criar rota de conexão
        const baseRoute = this.createBaseRoute();
        
        // Faz o post usando a api com o axios e enviando os dados
        const response = await this.apiClient.post(baseRoute, form);
        
        // Retorna a resposta do backend
        return response;
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
      return [];
    }
  }

  async updateCliente(Id: string, form: ICliente) {
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
      console.error("Erro ao buscar clientes", error);
      return [];
    }
  }

  async deleteCliente(Id: string) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(Id);

      // Faz o put usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);
      
      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
      return [];
    }
  }
}