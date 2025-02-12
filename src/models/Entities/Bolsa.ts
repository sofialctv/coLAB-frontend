import { Escolaridade } from './Enums/Escolaridade';

export interface IBolsaRequest {
  id: number;
  nome: string;
  planoTrabalho: string;
  valor: number;
  dataInicio: Date | string;
  dataFim: Date | string | null;
  dataPrevistaFim: Date | string;
  ativo: boolean;
  pessoaId: number;
  projetoId: number;
  cargoId: number;
  escolaridade: number;
}

export class BolsaRequest implements IBolsaRequest {
  public constructor(
    public id: number,
    public nome: string,
    public planoTrabalho: string,
    public valor: number,
    public dataInicio: Date | string,
    public dataFim: Date | string | null,
    public dataPrevistaFim: Date | string,
    public ativo: boolean,
    public pessoaId: number,
    public projetoId: number,
    public cargoId: number,
    public escolaridade: number
  ) {}
}


// Bolsa.ts
export interface IBolsa {
    Id: number;
    Nome: string;
    PlanoTrabalho: string;
    Valor: number;
    DataInicio: Date | string;
    DataFim: Date | string | null;
    DataPrevistaFim: Date | string;
    Ativo: boolean;
    PessoaId: number | null;
    PessoaNome: string;
    ProjetoId: number | null;
    ProjetoNome: string;
    CargoId: number | null;
    CargoNome: string;
    Escolaridade: Escolaridade;
  }

  export class Bolsa implements IBolsa {
    public constructor (
      public Id: number,
      public Nome: string,
      public PlanoTrabalho: string,
      public Valor: number,
      public DataInicio: Date | string,
      public DataFim: Date | string | null,
      public DataPrevistaFim: Date | string,
      public Ativo: boolean,
      public PessoaId: number | null,
      public PessoaNome: string,
      public ProjetoId: number | null,
      public ProjetoNome: string,
      public CargoId: number | null,
      public CargoNome: string,
      public Escolaridade: Escolaridade
    ) {}
  }
