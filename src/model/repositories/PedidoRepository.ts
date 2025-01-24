// src/repositories/ProductRepository.js
import api from '@/services/api';
import type { IPedido } from '../Pedido';
import { Pedido } from '../Pedido';
import PedidoRoutes from './apiRoutes/PedidoRoutes';

export default class PedidoRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new PedidoRoutes({}).entity;
  }
  
  createDeleteRoute(id: string) {
    return new PedidoRoutes({id: id}).delete;
  }

  async fetchAllPedido() {
    try {
        // Criar rota de conexão
        const baseRoute = this.createBaseRoute();
        
        // Faz a request usando a api com o axios
        const response = await this.apiClient.get(baseRoute);
        
        // Retorna a função com a criação de objetos
        return response.data.value.map((pedido: IPedido) => new Pedido(pedido.Id, pedido.Data, pedido.Valor));
    } catch (error) {
      console.error("Erro ao buscar pedidos", error);
      return [];
    }
  }

  async createPedido(form: IPedido) {
    try {
        // Criar rota de conexão
        const baseRoute = this.createBaseRoute();
        
        // Faz o post usando a api com o axios e enviando os dados
        const response = await this.apiClient.post(baseRoute, form);
        
        // Retorna a resposta do backend
        return response;
    } catch (error) {
      console.error("Erro ao buscar pedidos", error);
      return [];
    }
  }

  async updatePedido(Id: string, form: IPedido) {
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
      console.error("Erro ao buscar pedidos", error);
      return [];
    }
  }

  async deletePedido(Id: string) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(Id);

      // Faz o put usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);
      
      // Retorna a resposta do backend
      return response;
    } catch (error) {
      console.error("Erro ao buscar pedidos", error);
      return [];
    }
  }
}