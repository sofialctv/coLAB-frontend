import type { ICargo } from './Cargo';
import type { IPessoa } from './Pessoa';

export interface IHistoricoCargo {
  Id: number;
  DataInicio: Date;
  DataFim: Date;
  Descricao: string;

  Cargo: ICargo;
  Pessoa: IPessoa;
}

export class HistoricoCargo implements IHistoricoCargo {
  public constructor (
    public Id: number,
    public DataInicio: Date,
    public DataFim: Date,
    public Descricao: string,
    public Cargo: ICargo,
    public Pessoa: IPessoa
  ) {}
}
