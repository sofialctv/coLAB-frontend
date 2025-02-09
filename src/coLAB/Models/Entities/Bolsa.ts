import type { IPessoa } from './Pessoa';
import type { ITipoBolsa } from './TipoBolsa';
import type { IProjeto } from './Projeto';

export interface IBolsa{
    Id: number;
    Valor: number;
    DataInicio: Date;
    DataFim?: Date;
    DataPrevistaFim: Date;
    Ativo: boolean;
    TipoBolsa: ITipoBolsa;
    PessoaId: number | null
    PessoaNome: string
    ProjetoId: number | null
    ProjetoNome: string
}

export class Bolsa implements IBolsa {
    public constructor (
        public Id: number,
        public Valor: number,
        public DataInicio: Date,
        public DataFim?: Date,
        public DataPrevistaFim: Date,
        public Ativo: boolean,
        public TipoBolsa: ITipoBolsa,
        public PessoaId: number | null,
        public PessoaNome: string,
        public ProjetoId: number | null,
        public ProjetoNome: string,
    ) {
        this.Id = Id;
        this.Valor = Valor;
        this.DataInicio = DataInicio;
        this.DataFim = DataFim;
        this.DataPrevistaFim = DataPrevistaFim;
        this.Ativo = Ativo;
        this.TipoBolsa = TipoBolsa;
        this.PessoaId = PessoaId;
        this.PessoaNome = PessoaNome;
        this.ProjetoId = ProjetoId;
        this.ProjetoNome = ProjetoId;
    }
}
