
export interface ICargoResponse {
  Id: number;
  Nome: string;
  Descricao: string;
  Bolsas: any[];
}

export class CargoResponse implements ICargoResponse {
  public constructor (public Id: number, public Nome: string, public Descricao: string, public Bolsas: any[]) {
    this.Id = Id;
    this.Nome = Nome;
    this.Descricao = Descricao;
    this.Bolsas = Bolsas;
  }
}

export interface ICargoRequest {
  Id: number;
  Nome: string;
  Descricao: string;
}

export class Cargo implements ICargoRequest {
  public constructor (public Id: number, public Nome: string, public Descricao: string) {
    this.Id = Id;
    this.Nome = Nome;
    this.Descricao = Descricao;
  }
}


