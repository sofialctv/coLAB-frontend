import type { IProjeto } from '@/models/Entities/Projeto'
import ProjetoRepository from '@/models/Repositories/ProjetoRepository'

export default class ProjetoService {
  private projetoRepository: ProjetoRepository

  constructor() {
    this.projetoRepository = new ProjetoRepository()
  }

  async getAllProjetos() {
    try {
      return await this.projetoRepository.fetchAllProjeto()
    } catch (error) {
      console.error('Erro ao buscar projetos no serviço.', error)
      throw error
    }
  }

  async createProjeto(form: IProjeto) {
    try {
      return await this.projetoRepository.createProjeto(form)
    } catch (error) {
      console.error('Erro ao criar projeto no serviço.', error)
      throw error
    }
  }

  async updateProjeto(id: number, form: IProjeto) {
    try {
      return await this.projetoRepository.updateProjeto(id, form)
    } catch (error) {
      console.error('Erro ao atualizar projeto no serviço.', error)
      throw error
    }
  }

  async deleteProjeto(id: number) {
    try {
      return await this.projetoRepository.deleteProjeto(id)
    } catch (error) {
      console.error('Erro ao deletar projeto no serviço.', error)
      throw error
    }
  }
}
