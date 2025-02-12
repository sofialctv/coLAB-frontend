import type { IProjeto } from '../models/Entities/Projeto'
import ProjetoService from '@/services/ProjetoService'

export default class ProjetoController {
  private projetoService: ProjetoService

  constructor() {
    this.projetoService = new ProjetoService()
  }

  async getAll() {
    return await this.projetoService.getAllProjetos()
  }

  async create(form: IProjeto) {
    return await this.projetoService.createProjeto(form)
  }

  async update(id: number, form: IProjeto) {
    return await this.projetoService.updateProjeto(id, form)
  }

  async delete(id: number) {
    return await this.projetoService.deleteProjeto(id)
  }
}
