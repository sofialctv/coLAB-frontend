import type { IHistoricoCargo } from './HistoricoCargo';
import { Bolsa } from './Bolsa';

export interface IPessoa {
    Id: number;
    Nome: string;
    Email: string;
    Telefone: string;
    Cpf: string;

    Bolsa?: Bolsa;
    HistoricosCargo?: IHistoricoCargo[];
}

export class Pessoa implements IPessoa {
    public constructor (
        public Id: number,
        public Nome: string,
        public Email: string,
        public Telefone: string,
        public Cpf: string,
        public Bolsa?: Bolsa,
        public HistoricosCargo?: IHistoricoCargo[]
    ) {
        this.Id = Id;
        this.Nome = Nome;
        this.Email = Email;
        this.Telefone = Telefone;
        this.Cpf = Cpf;
        this.Bolsa = Bolsa;
        this.HistoricosCargo = HistoricosCargo;
    }
}
