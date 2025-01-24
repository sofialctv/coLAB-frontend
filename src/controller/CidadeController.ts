import type { ICidade } from '@/model/Cidade';
import CidadeRepository from '../model/repositories/CidadeRepository';

export default class CidadeController {
  cidadeRepository;
  constructor() {
    this.cidadeRepository = new CidadeRepository();
  }

  async getAllCidade() {
    return await this.cidadeRepository.fetchAllCidade();
  }

  async create(form: ICidade) {
    if (import.meta.env.VITE_MOCK === "true") return
    return await this.cidadeRepository.createCidade(form);
  }

  async update(Id: string, item: ICidade) {
    if (import.meta.env.VITE_MOCK === "true") return
    return await this.cidadeRepository.updateCidade(Id, item);
  }

  async delete(Id: string) {
    if (import.meta.env.VITE_MOCK === "true") return
    return await this.cidadeRepository.deleteCidade(Id);
  }
}