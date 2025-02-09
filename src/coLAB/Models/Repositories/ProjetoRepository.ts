import api from '@/services/api'
import type { IProjeto } from '../Entities/Projeto'
import { Projeto } from '../Entities/Projeto'
import ProjetoRoutes from '../ApiRoutes/ProjetoRoutes'

export default class ProjetoRepository {
  apiClient
  constructor() {
    this.apiClient = api
  }

  createBaseRoute() {
    return new ProjetoRoutes({}).getAll
  }

  createDeleteRoute(id: number) {
    return new ProjetoRoutes({ id: id }).delete
  }

  async fetchAllProjeto() {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute()

      // Faz a request usando a API com o axios
      const response = await this.apiClient.get(baseRoute)

      // Retorna a função com a criação de objetos
      return response.data.$values.map((projeto: IProjeto) => {
        // Verificar o histórico de status e pegar o último status válido
        const ultimoStatus = projeto
          .historicoStatus!.$values!.filter((status: any) => !status.dataFim) // apenas o status sem dataFim
          .sort(
            (a: any, b: any) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime(),
          ) // dataInicio mais recente

        // definindo o status como o valor do último item no histórico
        const statusAtual = ultimoStatus[0].status

        return new Projeto(
          projeto.id,
          projeto.nome,
          projeto.dataInicio,
          projeto.dataFim,
          projeto.dataPrevistaFim,
          projeto.descricao,
          projeto.orcamento,
          projeto.financiadorId,
          projeto.financiadorNome,
          statusAtual, // status mais atual do projeto
          projeto.bolsa,
          projeto.historicoStatus,
        )
      })
    } catch (error) {
      console.error('Erro ao buscar projetos.', error)
      throw error
    }
  }

  async createProjeto(form: IProjeto) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute()

      // Faz o post usando a api com o axios e enviando os dados
      const response = await this.apiClient.post(baseRoute, form)

      // Retorna a resposta do backend
      return response
    } catch (error) {
      console.error('Erro ao criar projeto.', error)
      throw error
    }
  }

  async updateProjeto(id: number, form: IProjeto) {
    try {
      // Criar rota de conexão
      const baseRoute = this.createBaseRoute()

      // Garante que o Id está salvo dentro do form
      form.id = id

      // Faz o put usando a api com o axios e enviando os dados
      const response = await this.apiClient.put(`${baseRoute}/${id}`, form)

      // Retorna a resposta do backend
      return response
    } catch (error) {
      console.error('Erro ao atualizar projeto.', error)
      throw error
    }
  }

  async deleteProjeto(Id: number) {
    try {
      // Criar rota de conexão
      const deleteRoute = this.createDeleteRoute(Id)

      // Faz o delete usando a api com o axios e enviando os dados
      const response = await this.apiClient.delete(deleteRoute)

      // Retorna a resposta do backend
      return response
    } catch (error) {
      console.error('Erro ao deletar o projeto.', error)
      throw error
    }
  }
}
