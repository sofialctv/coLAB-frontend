import type { IBolsa } from './Bolsa';

export interface IPessoaResponse {
  Id: number;
  Nome: string;
  Email: string;
  Telefone: string;
  Cpf: string;
  Bolsas: IBolsa[];
}

export class PessoaResponse implements IPessoaResponse {
  constructor(
    public Id: number,
    public Nome: string,
    public Email: string,
    public Telefone: string,
    public Cpf: string,
    public Bolsas: IBolsa[]
  ) {}
}


export interface IPessoaRequest {
  Id: number;
  Nome: string;
  Email: string;
  Telefone: string;
  Cpf: string;
}

export class PessoaRequest {
  constructor(
    public Id: number,
    public Nome: string,
    public Email: string,
    public Telefone: string,
    public Cpf: string,
  ) {}
}
