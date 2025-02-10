import type { IPessoa } from './Pessoa';
import type { ITipoBolsa } from './TipoBolsa';
import type { IProjeto } from './Projeto';


// Bolsa.ts
export interface IBolsa {
    Id: number;
    Valor: number;
    DataInicio: Date;
    DataFim?: Date;
    DataPrevistaFim: Date;
    Ativo: boolean;
    TipoBolsaId: number | null;
    TipoBolsaNome: string;
    PessoaId: number | null;
    PessoaNome: string;
    ProjetoId: number | null;
    ProjetoNome: string;
  }
  
  export class Bolsa implements IBolsa {
    public constructor (
      public Id: number,
      public Valor: number,
      public DataInicio: Date,
      public DataPrevistaFim: Date,
      public Ativo: boolean,
      public TipoBolsaId: number | null,
      public TipoBolsaNome: string,
      public PessoaId: number | null,
      public PessoaNome: string,
      public ProjetoId: number | null,
      public ProjetoNome: string,
      public DataFim?: Date
    ) {}
  }
