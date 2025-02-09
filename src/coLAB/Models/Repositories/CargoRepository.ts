import api from '@/services/api';
import { Cargo, ICargo } from '../Entities/Cargo';
import CargoRoutes from '../ApiRoutes/CargoRoutes';

export default class CargoRepository {
  apiClient;
  constructor() {
    this.apiClient = api;
  }

  createBaseRoute() {
    return new CargoRoutes({}).getAll;
  }

  createDeleteRoute(id: number) {
    return new CargoRoutes({ id: id }).delete;
  }

  async fetchAllCargo() {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz a request usando a api com o axios
      const response = await this.apiClient.get(baseRoute);

      // Retorna a função com a criação de objetos
      return response.data.value.map((cargo: ICargo) =>
        new Cargo (
          cargo.Id,
          cargo.Nome,
          cargo.Descricao
        ));

    } catch (error) {
      console.error("Erro ao buscar cargos.", error);
      throw error;
    }
  }

  async createCargo(form: ICargo) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute();

      // Faz o post usando a api com o axios e enviando os dados
      const response = await this.apiClient.post(baseRoute, form);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao criar cargo.", error);
      throw error;
    }
  }

  async updateCargo(Id: number, form: ICargo) {
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
      console.error("Erro ao atualizar cargo.", error);
      throw error;
    }
  }

  async deleteCargo(Id: number) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(Id);

      // Faz o delete usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute);

      // Retorna a resposta do backend
      return response;

    } catch (error) {
      console.error("Erro ao deletar o cargo.", error);
      throw error;
    }
  }
}
