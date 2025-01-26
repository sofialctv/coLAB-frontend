import type { ICidade } from '@/model/Cidade';
import { Cidade } from '@/model/Cidade';
import CidadeController from '../CidadeController';
import { GenericStore } from './generic/GenericStore';

const cidadeController = new CidadeController();
const genericStore = new GenericStore<ICidade>('cidade');

const cidades: Cidade[] = [
    new Cidade('31773898-7570-43dd-85dd-39cfc88d6c2f', 'Vitória'),
    new Cidade('31773898-7570-43dd-85dd-39cfc99fs934', 'Colatina'),
    new Cidade('31773898-7570-43dd-85dd-39cfc88d6c2e', 'Serra')
];

// if (import.meta.env.VITE_MOCK === "true") genericStore.enableMock(async () => cidades);
genericStore.enableMock(async () => cidades);
export const useCidadeStore = genericStore.createStore(cidadeController);
