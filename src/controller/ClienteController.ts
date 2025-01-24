import type { ICliente } from '@/model/Cliente';
import ClienteRepository from '@/model/repositories/ClienteRepository';

export default class ClienteController {
  clienteRepository;
  constructor() {
    this.clienteRepository = new ClienteRepository();
  }

  async getAllCliente() {
    return await this.clienteRepository.fetchAllCliente();
  }

  async create(form: ICliente) {
    if (import.meta.env.VITE_MOCK === "true") return
    return await this.clienteRepository.createCliente(form);
  }

  async update(Id: string, item: ICliente) {
    if (import.meta.env.VITE_MOCK === "true") return
    return await this.clienteRepository.updateCliente(Id, item);
  }

  async delete(Id: string) {
    if (import.meta.env.VITE_MOCK === "true") return
    return await this.clienteRepository.deleteCliente(Id);
  }
}