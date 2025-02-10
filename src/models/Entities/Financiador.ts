export interface IFinanciador {
  Id: number;
  Nome: string;
  Email: string;
}

export class Financiador implements IFinanciador {
  public constructor(public Id: number, public Nome: string, public Email: string) {
    this.Id = Id;
    this.Nome = Nome;
    this.Email = Email;
  }
}
