import api from '@/coLAB/API/api';
import type { ICargo } from '../Entities/Cargo';
import { Cargo } from '../Entities/Cargo';
import CargoRoutes from '../ApiRoutes/CargoRoutes';

export default class CargoRepository {

  private cargoRoutes = new CargoRoutes();

  // Se um ID for passado ele chama o getById, se não, chama o getAll
  private createBaseRoute(Id?: number) : string {
    return Id ? this.cargoRoutes.getById(Id) : this.cargoRoutes.getAll();
  }

  async fetchCargo_s() {
    try {
      const baseRoute = this.createBaseRoute();
      const response = await api.get(baseRoute);

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
      const baseRoute = this.cargoRoutes.post();
      const response = await api.post(baseRoute, form);

      return response; // Retorna a resposta do backend

    } catch (error) {
      console.error("Erro ao criar cargo.", error);
      throw error;
    }
  }

  async updateCargo(Id: number, form: ICargo) {
    try {
      const baseRoute = this.cargoRoutes.update(Id);
      const response = await api.put(baseRoute, form);

      return response;

    } catch (error) {
      console.error("Erro ao atualizar cargo.", error);
      throw error;
    }
  }

  async deleteCargo(Id: number) {
    try {
      const baseRoute = this.cargoRoutes.delete(Id);
      const response = await api.delete(baseRoute);

      return response;

    } catch (error) {
      console.error("Erro ao deletar o cargo.", error);
      throw error;
    }
  }
}
