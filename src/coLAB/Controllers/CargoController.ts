import { ICargo } from '../Models/Entities/Cargo';
import CargoRepository from '../Models/Repositories/CargoRepository';

export default class CargoController {
  cargoRepository;
  constructor() {
    this.cargoRepository = new CargoRepository();
  }

  async getAll() {
    return await this.cargoRepository.fetchAllCargo();
  }

  async create(form: ICargo) {
    return await this.cargoRepository.createCargo(form);
  }

  async update(Id: number, item: ICargo) {
    return await this.cargoRepository.updateCargo(Id, item);
  }

  async delete(Id: string) {
    return await this.cargoRepository.deleteCargo(Id);
  }
}