import type { IBolsa, IBolsaRequest } from '../models/Entities/Bolsa'
import BolsaRepository from '../models/Repositories/BolsaRepository'

export default class BolsaController {
  bolsaRepository
  constructor() {
    this.bolsaRepository = new BolsaRepository()
  }

  async getAll() {
    return await this.bolsaRepository.fetchAllBolsa()
  }

  async create(form: IBolsaRequest) {
    return await this.bolsaRepository.createBolsa(form)
  }

  async update(id: number, form: IBolsaRequest) {
    return await this.bolsaRepository.updateBolsa(id, form)
  }

  async delete(id: number) {
    return await this.bolsaRepository.deleteBolsa(id)
  }
}
