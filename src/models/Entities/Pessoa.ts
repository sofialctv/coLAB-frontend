import type { IHistoricoCargo } from './HistoricoCargo';

export interface IPessoaResponse {
  Id: number;
  Nome: string;
  Email: string;
  Telefone: string;
  Cpf: string;
  CargoNome: string;
  BolsaNome: string;
  HistoricosCargo?: IHistoricoCargo[];
}

export class PessoaResponse implements IPessoaResponse {
  constructor(
    public Id: number,
    public Nome: string,
    public Email: string,
    public Telefone: string,
    public Cpf: string,
    public CargoNome: string,
    public BolsaNome: string,
    public HistoricosCargo?: IHistoricoCargo[]
  ) {}
}


export interface IPessoaRequest {
  Id: number;
  Nome: string;
  Email: string;
  Telefone: string;
  Cpf: string;
  CargoId: number;
  BolsaId: number;
}

export class PessoaRequest {
  constructor(
    public Id: number,
    public Nome: string,
    public Email: string,
    public Telefone: string,
    public Cpf: string,
    public CargoId: number,
    public BolsaId: number
  ) {}
}
