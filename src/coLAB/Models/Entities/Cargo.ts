export interface ICargo {
    Id: number;
    Nome: string;
    Descricao: string;
}

export class Cargo implements ICargo {
    public constructor (public Id: number, public Nome: string, public Descricao: string) {
        this.Id = Id;
        this.Nome = Nome;
        this.Descricao = Descricao;
    }
}
