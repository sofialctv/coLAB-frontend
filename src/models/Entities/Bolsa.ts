import { Escolaridade } from './Enums/Escolaridade';

// Bolsa.ts
export interface IBolsa {
    Id: number;
    Nome: number | null;
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
    Escolaridade: Escolaridade;
  }

  export class Bolsa implements IBolsa {
    public constructor (
      public Id: number,
      public Valor: number,
      public Nome: number | null,
      public PlanoTrabalho: string,
      public DataInicio: Date | string,
      public DataFim: Date | string | null,
      public DataPrevistaFim: Date | string,
      public Ativo: boolean,
      public PessoaId: number | null,
      public PessoaNome: string,
      public ProjetoId: number | null,
      public ProjetoNome: string,
      public Escolaridade: Escolaridade
    ) {}
  }
