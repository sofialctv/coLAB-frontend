import type { IHistoricoStatus } from './HistoricoStatus'
import type { IBolsa } from './Bolsa'

export interface IProjeto {
  id: number | null
  nome: string
  dataInicio: Date | string
  dataFim: Date | string | null
  dataPrevistaFim: Date | string
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
    public dataInicio: Date | string,
    public dataFim: Date | string | null,
    public dataPrevistaFim: Date | string,
    public descricao: string,
    public orcamento: number,
    public financiadorId: number | null,
    public financiadorNome: string,
    public bolsa?: IBolsa[],
    public historicoStatus?: IHistoricoStatus[],
  ) {}
}
