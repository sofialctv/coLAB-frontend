import type { IProjeto } from '../models/Entities/Projeto'
import ProjetoRepository from '../models/Repositories/ProjetoRepository'

export default class ProjetoController {
  projetoRepository
  constructor() {
    this.projetoRepository = new ProjetoRepository()
  }

  async getAll() {
    return await this.projetoRepository.fetchAllProjeto()
  }

  async create(form: IProjeto) {
    return await this.projetoRepository.createProjeto(form)
  }

  async update(id: number, form: IProjeto) {
    return await this.projetoRepository.updateProjeto(id, form)
  }

  async delete(id: number) {
    return await this.projetoRepository.deleteProjeto(id)
  }
}
