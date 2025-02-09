import CargoRepository from '../Models/Repositories/CargoRepository';
import type { ICargo } from '../Models/Entities/Cargo';

export default class CargoService {
  private cargoRepository: CargoRepository;

  constructor() {
    this.cargoRepository = new CargoRepository();
  }

  async getAll(): Promise<ICargo[]> {
    return await this.cargoRepository.fetchCargo_s();
  }

  async create(form: ICargo) {
    if (!form.Nome) {
      throw new Error("Nome é obrigatório.");
    }
    return await this.cargoRepository.createCargo(form);
  }

  async update(Id: number, form: ICargo) {
    const cargoExiste = await this.cargoRepository.fetchCargo_s();
    if (!cargoExiste.find(c => c.Id === Id)) {
      throw new Error("Cargo não encontrado.");
    }
    return await this.cargoRepository.updateCargo(Id, form);
  }

  async delete(Id: number) {
    return await this.cargoRepository.deleteCargo(Id);
  }
}
