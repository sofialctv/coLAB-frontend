import type { IHistoricoStatus } from './HistoricoStatus'
import type { IBolsa } from './Bolsa'

export interface IProjeto {
  id: number | null
  nome: string
  dataInicio: Date
  dataFim: Date | null
  dataPrevistaFim: Date
  descricao: string
  orcamento: number
  financiadorId: number | null
  financiadorNome: string
  bolsa?: IBolsa[]
  historicoStatus?: IHistoricoStatus[]
}

export class Projeto implements IProjeto {
  public constructor(
    public id: number | null,
    public nome: string,
    public dataInicio: Date,
    public dataFim: Date | null,
    public dataPrevistaFim: Date,
    public descricao: string,
    public orcamento: number,
    public financiadorId: number | null,
    public financiadorNome: string,
    public bolsa?: IBolsa[],
    public historicoStatus?: IHistoricoStatus[],
  ) {}
}
