export interface IHistoricoStatus {
  status: number
  dataInicio: Date
  dataFim: Date
  statusDescricao: string
}

export class HistoricoStatus implements IHistoricoStatus {
  public constructor(
    public status: number,
    public dataInicio: Date,
    public dataFim: Date,
    public statusDescricao: string,
  ) {
    this.status = status
    this.dataInicio = dataInicio
    this.dataFim = dataFim
    this.statusDescricao = statusDescricao
  }
}
