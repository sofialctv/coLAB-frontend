import api from '@/api/api';
import type { ICargo } from '../Entities/Cargo';
import { Cargo } from '../Entities/Cargo';
import CargoRoutes from '../ApiRoutes/CargoRoutes';

export default class CargoRepository {
  apiClient;

  constructor() {
    this.apiClient = api;
  };

  createBaseRoute() {
    return new CargoRoutes({}).getAll;
  }

  createDeleteRoute(id: number) {
    return new CargoRoutes({ id: id }).delete;
  };

  async fetchCargo_s() {
    try {
      const baseRoute = this.createBaseRoute();
      const response = await this.apiClient.get(baseRoute);

      // Retorna a função com a criação de objetos
      return response.data.$value.map((cargo: any) => {
        return new Cargo (
          cargo.id,
          cargo.nome,
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

  async createCargo(form: ICargo) {
    try {
      const baseRoute = this.createBaseRoute();
      const response = await this.apiClient.post(baseRoute, form);

      return response; // Retorna a resposta do backend

    } catch (error) {
      console.error("Erro ao criar cargo.", error);
      throw error;
    }
  }

  async updateCargo(Id: number, form: ICargo) {
    try {
      const baseRoute = this.createBaseRoute();
      form.Id = Id;
      const response = await this.apiClient.put(`${baseRoute}/${Id}`, form);

      return response;

    } catch (error) {
      console.error("Erro ao atualizar cargo.", error);
      throw error;
    }
  }

  async deleteCargo(Id: number) {
    try {
      const deleteRoute = this.createDeleteRoute(Id);
      const response = await this.apiClient.delete(deleteRoute);

      return response;

    } catch (error) {
      console.error("Erro ao deletar o cargo.", error);
      throw error;
    }
  }
}
