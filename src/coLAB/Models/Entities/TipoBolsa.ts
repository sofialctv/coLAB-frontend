import { IBolsa } from './Bolsa';
import { Escolaridade } from './Enums/Escolaridade';

export interface ITipoBolsa {
    Id: number;
    Nome: string;
    Descricao: string;
    Escolaridade: Escolaridade;
    EscolaridadeDescricao: string;
    Bolsa?: IBolsa;
}

export class TipoBolsa implements ITipoBolsa {
    public Id: number;
    public Nome: string;
    public Descricao: string;
    public Escolaridade: Escolaridade;

    constructor(id: number, nome: string, descricao: string, escolaridade: Escolaridade) {
        this.Id = id;
        this.Nome = nome;
        this.Descricao = descricao;
        this.Escolaridade = escolaridade;
    }


    get EscolaridadeDescricao(): string {
        return this.Escolaridade.toString();
    }
}
