import type { ICliente } from '@/model/Cliente';
import { Cliente } from '@/model/Cliente';
import ClienteController from '../ClienteController';
import { GenericStore } from './generic/GenericStore';

const clienteController = new ClienteController();
const genericStore = new GenericStore<ICliente>('cliente');

const clientes: Cliente[] = [
    new Cliente('31773898-7570-43dd-85dd-39cfc88d6c2f', 'Marcos', '27909872617', '18374635546', '31773898-7570-43dd-85dd-39cfc88d6c2f'),
    new Cliente('31773898-7570-43dd-85dd-39cfc88d6c2e', 'Henrique', '27981726346', '01938345786', '31773898-7570-43dd-85dd-39cfc88d6c2e')
];

genericStore.enableMock(async () => clientes);
export const useClienteStore = genericStore.createStore(clienteController);
