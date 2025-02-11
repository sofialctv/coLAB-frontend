import CargoRepository from '../models/Repositories/CargoRepository';
import type { ICargo } from '../models/Entities/Cargo';

export default class CargoService {
  private cargoRepository: CargoRepository;

  constructor() {
    this.cargoRepository = new CargoRepository();
  }

  async getAll(): Promise<ICargo[]> {
    try {
      return await this.cargoRepository.fetchCargo_s();
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar cargos.");
    }
  }

  async create(form: ICargo) {
    try {
      return await this.cargoRepository.createCargo(form);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar cargo.");
    }
  }

  async update(Id: number, form: ICargo) {
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
