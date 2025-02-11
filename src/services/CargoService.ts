import CargoRepository from '../models/Repositories/CargoRepository';
import type { ICargoRequest, ICargoResponse } from '../models/Entities/Cargo';

export default class CargoService {
  private cargoRepository: CargoRepository;

  constructor() {
    this.cargoRepository = new CargoRepository();
  }

  async getAll(id?: number): Promise<ICargoResponse[]> {
    try {
      if (id !== undefined) {
        return await this.cargoRepository.fetchCargo_s(id); // Chama o método de busca por ID
      }
      return await this.cargoRepository.fetchCargo_s(); // Busca todos os cargos
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar cargos.");
    }
  }

  async create(form: ICargoRequest) {
    try {
      return await this.cargoRepository.createCargo(form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar cargo.");
    }
  }

  async update(Id: number, form: ICargoRequest) {
    try {
      const cargoExiste = await this.cargoRepository.fetchCargo_s();
      if (!cargoExiste.find(c => c.Id === Id)) {
        throw new Error("Cargo não encontrado.");
      }
      return await this.cargoRepository.updateCargo(Id, form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar cargo.");
    }
  }

  async delete(Id: number) {
    try {
      return await this.cargoRepository.deleteCargo(Id);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar cargo.");
    }
  }
}
