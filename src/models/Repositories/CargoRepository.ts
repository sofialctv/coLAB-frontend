import api from '@/api/api';
import type { ICargoRequest } from '../Entities/Cargo';
import { CargoResponse } from '../Entities/Cargo';
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

  async fetchCargo_s(id?: number) {
    try {
      // Se um id é passado, usa a rota getById, senão usa a rota getAll
      const baseRoute = id ? new CargoRoutes({ id }).getById : this.createBaseRoute();

      const response = await this.apiClient.get(baseRoute);

      if (id) {
        return new CargoResponse(
          response.data.id,
          response.data.nome,
          response.data.descricao,
          response.data.bolsas
        );
      } else {
        return response.data.$values.map((cargo: any) => {
          return new CargoResponse (
            cargo.id,
            cargo.nome,
            cargo.descricao,
            cargo.bolsas
          );
        });
      }

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

  async createCargo(form: ICargoRequest) {
    try {
      const baseRoute = this.createBaseRoute();
      const response = await this.apiClient.post(baseRoute, form);

      return response; // Retorna a resposta do backend

    } catch (error) {
      console.error("Erro ao criar cargo.", error);
      throw error;
    }
  }

  async updateCargo(Id: number, form: ICargoRequest) {
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
