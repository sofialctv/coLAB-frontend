export interface IPedido {
    Id: string;
    Data: string;
    Valor: number;
}

export class Pedido implements IPedido {
    public constructor (public Id: string, public Data: string, public Valor: number) {
        this.Id = Id;
        this.Data = Data;
        this.Valor = Valor;
    }
}