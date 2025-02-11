
export interface IHistoricoCargoResponse {
  Id: number;
  DataInicio: Date;
  DataFim: Date;
  Descricao: string;

  PessoaNome: string;
  CargoNome: string;
}

export class HistoricoCargo implements IHistoricoCargoResponse {
  public constructor (
    public Id: number,
    public DataInicio: Date,
    public DataFim: Date,
    public Descricao: string,
    public PessoaNome: string,
    public CargoNome: string
  ) {}
}

export interface IHistoricoCargoRequest {
  DataInicio: Date;
  DataFim: Date;
  Descricao: string;
  PessoaId: number;
  CargoId: number;
}

export class HistoricoCargoRequest implements IHistoricoCargoRequest {
  public constructor (
    public Id: number,
    public DataInicio: Date,
    public DataFim: Date,
    public Descricao: string,
    public PessoaId: number,
    public CargoId: number
  ) {}
}
