import type { IPedido } from '@/model/Pedido';
import PedidoRepository from '@/model/repositories/PedidoRepository';

export default class PedidoController {
  pedidoRepository;
  constructor() {
    this.pedidoRepository = new PedidoRepository();
  }

  async getAllPedido() {
    return await this.pedidoRepository.fetchAllPedido();
  }

  async create(form: IPedido) {
    if (import.meta.env.VITE_MOCK === "true") return
    return await this.pedidoRepository.createPedido(form);
  }

  async update(Id: string, item: IPedido) {
    if (import.meta.env.VITE_MOCK === "true") return
    return await this.pedidoRepository.updatePedido(Id, item);
  }

  async delete(Id: string) {
    if (import.meta.env.VITE_MOCK === "true") return
    return await this.pedidoRepository.deletePedido(Id);
  }
}