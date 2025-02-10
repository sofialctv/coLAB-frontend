import type { ICargo } from '../models/Entities/Cargo';
import CargoRepository from '../models/Repositories/CargoRepository';

export default class CargoController {
  cargoRepository;
  constructor() {
    this.cargoRepository = new CargoRepository();
  }

  async getAll() {
    return await this.cargoRepository.fetchCargo_s();
  }

  async create(form: ICargo) {
    return await this.cargoRepository.createCargo(form);
  }

  async update(Id: number, form: ICargo) {
    return await this.cargoRepository.updateCargo(Id, form);
  }

  async delete(Id: number) {
    return await this.cargoRepository.deleteCargo(Id);
  }
}
