import type { IHistoricoCargo } from './HistoricoCargo';

export interface IPessoaResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cargoNome: string;
  bolsaNome: string;
  historicosCargo?: IHistoricoCargo[];
} {}

export interface IPessoaRequest {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cargoId: number;
  bolsaId: number;
} {}
