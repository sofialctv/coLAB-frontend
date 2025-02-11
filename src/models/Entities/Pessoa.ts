import type { IHistoricoCargoResponse } from './HistoricoCargo';

export interface IPessoaResponse {
  Id: number;
  Nome: string;
  Email: string;
  Telefone: string;
  Cpf: string;
  CargoNome: string;
  BolsaNome: string | null;
  HistoricosCargo?: IHistoricoCargoResponse[];
}

export class PessoaResponse implements IPessoaResponse {
  constructor(
    public Id: number,
    public Nome: string,
    public Email: string,
    public Telefone: string,
    public Cpf: string,
    public CargoNome: string,
    public BolsaNome: string | null,
    public HistoricosCargo?: IHistoricoCargoResponse[]
  ) {}
}


export interface IPessoaRequest {
  Id: number;
  Nome: string;
  Email: string;
  Telefone: string;
  Cpf: string;
  BolsaId: number | null;
}

export class PessoaRequest {
  constructor(
    public Id: number,
    public Nome: string,
    public Email: string,
    public Telefone: string,
    public Cpf: string,
    public BolsaId: number | null
  ) {}
}
