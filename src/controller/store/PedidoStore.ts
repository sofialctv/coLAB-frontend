import type { IPedido } from '@/model/Pedido';
import { Pedido } from '@/model/Pedido';
import PedidoController from '../PedidoController';
import { GenericStore } from './generic/GenericStore';

const pedidoController = new PedidoController();
const genericStore = new GenericStore<IPedido>('pedido');

const pedidos: Pedido[] = [
    new Pedido('31773898-7570-43dd-85dd-39cfc88d6c2f', '2024-10-01', 340),
    new Pedido('31773898-7570-43dd-85dd-39cfc99fs934', '2025-01-15', 800)
];

genericStore.enableMock(async () => pedidos);
export const usePedidoStore = genericStore.createStore(pedidoController);
