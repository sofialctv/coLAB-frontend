import CargoService from '@/services/CargoService';
import type { ICargoRequest } from '../models/Entities/Cargo';

export default class CargoController {

  private cargoService = new CargoService();

  async getAll(id? : number) {
    try {
      return await this.cargoService.getAll(id);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar cargos.");
    }
  }

  async create(form: ICargoRequest) {
    try {
      return await this.cargoService.create(form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar cargo.");
    }
  }

  async update(Id: number, form: ICargoRequest) {
    try {
      return await this.cargoService.update(Id, form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar cargo.");
    }
  }

  async delete(Id: number) {
    try {
      return await this.cargoService.delete(Id);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar cargo.");
    }
  }
}
