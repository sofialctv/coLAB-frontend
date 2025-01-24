export interface ICliente {
    Id: string;
    Nome: string;
    Telefone: string;
    Cpf: string;
    CidadeId: string;
}

export class Cliente implements ICliente {
    public constructor (public Id: string, public Nome: string, public Telefone: string, public Cpf: string, public CidadeId: string) {
        this.Id = Id;
        this.Nome = Nome;
        this.Telefone = Telefone;
        this.Cpf = Cpf;
        this.CidadeId = CidadeId;
    }
}