export interface ICidade {
    Id: string;
    Nome: string;
}

export class Cidade implements ICidade {
    public constructor (public Id: string, public Nome: string) {
        this.Id = Id;
        this.Nome = Nome;
    }
}