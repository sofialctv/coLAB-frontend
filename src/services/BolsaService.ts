import type { IBolsaRequest } from '../models/Entities/Bolsa'
import BolsaRepository from '../models/Repositories/BolsaRepository'

export default class BolsaService {
  private bolsaRepository: BolsaRepository

  constructor() {
    this.bolsaRepository = new BolsaRepository()
  }

  async getAllBolsa() {
    try {
      return await this.bolsaRepository.fetchAllBolsa()
    } catch (error) {
      console.error('Erro ao buscar bolsas no serviço.', error)
      throw error
    }
  }

  async createBolsa(form: IBolsaRequest) {
    try {
      return await this.bolsaRepository.createBolsa(form)
    } catch (error) {
      console.error('Erro ao criar bolsa no serviço.', error)
      throw error
    }
  }

  async updateBolsa(id: number, form: IBolsaRequest) {
    try {
      return await this.bolsaRepository.updateBolsa(id, form)
    } catch (error) {
      console.error('Erro ao atualizar bolsa no serviço.', error)
      throw error
    }
  }

  async deleteBolsa(id: number) {
    try {
      return await this.bolsaRepository.deleteBolsa(id)
    } catch (error) {
      console.error('Erro ao deletar bolsa no serviço.', error)
      throw error
    }
  }
}
