import { IPessoa } from './Pessoa';
import { ITipoBolsa } from './TipoBolsa';

export interface IBolsa{
    Id: number;
    Valor: number;
    DataInicio: Date;
    DataFim: Date;
    DataPrevistaFim: Date;
    Ativo: boolean;
    TipoBolsa: ITipoBolsa;
    Pessoa: IPessoa;
}

export class Bolsa implements IBolsa {
    public constructor (
        public Id: number,
        public Valor: number,
        public DataInicio: Date,
        public DataFim: Date,
        public DataPrevistaFim: Date,
        public Ativo: boolean,
        public TipoBolsa: ITipoBolsa,
        public Pessoa: IPessoa
    ) {
        this.Id = Id;
        this.Valor = Valor;
        this.DataInicio = DataInicio;
        this.DataFim = DataFim;
        this.DataPrevistaFim = DataPrevistaFim;
        this.Ativo = Ativo;
        this.TipoBolsa = TipoBolsa;
        this.Pessoa = Pessoa;
    }
}
