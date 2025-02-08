export interface IHistoricoStatus {
  id: number
  dataInicio: Date
  dataFim: Date
  statusDescricao: string
}

export class HistoricoStatus implements IHistoricoStatus {
  public constructor(
    public id: number,
    public dataInicio: Date,
    public dataFim: Date,
    public statusDescricao: string,
  ) {
    this.id = id
    this.dataInicio = dataInicio
    this.dataFim = dataFim
    this.statusDescricao = statusDescricao
  }
}
