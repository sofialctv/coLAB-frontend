<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjetoController from '../Controllers/ProjetoController'
import type { IProjeto } from '../Models/Entities/Projeto'
import { Projeto } from '../Models/Entities/Projeto'

// Definindo a lista de financiadores (somente exemplo)
const financiadores = ref<any[]>([])

// Regras de validação
const rules = {
  required: (value: any) => !!value || 'Campo obrigatório',
}

// Instância do controller
const projetoController = new ProjetoController()

// Lista de projetos
const projetos = ref<IProjeto[]>([])

// Estado do modal e projeto editável
const dialog = ref(false)
const projetoSelecionado = ref<IProjeto>(new Projeto(null, '', new Date(), null, new Date(), '', 0, null, ''))

// Carregar projetos ao iniciar
const carregarProjetos = async () => {
  projetos.value = await projetoController.getAll()
}

// Verificando se a tela é menor que 1164px
const adjustDatesContainer = ref(false)

const checkScreenSize = () => {
  adjustDatesContainer.value = window.innerWidth <= 1264
}

onMounted(() => {
  carregarProjetos()

  // Carregar financiador (esse é apenas um exemplo)
  financiadores.value = [
    { id: 1, nome: 'Financiador A' },
    { id: 2, nome: 'Financiador B' },
    { id: 3, nome: 'Financiador C' }
  ]

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

// Abrir modal para adicionar novo projeto
const abrirNovoProjeto = () => {
  projetoSelecionado.value = new Projeto(0, '', new Date(), new Date(), new Date(), '', 0, 0, '')
  dialog.value = true
}

// Abrir modal para edição
const editarProjeto = (projeto: IProjeto) => {
  // Garantindo que as datas sejam instâncias de Date
  projetoSelecionado.value = {
    ...projeto,
    dataInicio: new Date(projeto.dataInicio),
    dataFim: projeto.dataFim ? new Date(projeto.dataFim) : null, // Lidar com dataFim nula
    dataPrevistaFim: new Date(projeto.dataPrevistaFim),
  }
  dialog.value = true
}

// Salvar projeto (criação ou edição)
const salvarProjeto = async () => {
  if (projetoSelecionado.value.id) {
    await projetoController.update(projetoSelecionado.value.id, projetoSelecionado.value)
  } else {
    await projetoController.create(projetoSelecionado.value)
  }
  dialog.value = false
  await carregarProjetos()
}

// Excluir projeto
const excluirProjeto = async (id: number) => {
  if (confirm('Tem certeza que deseja excluir este projeto?')) {
    await projetoController.delete(id)
    await carregarProjetos()
  }
}
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Gerenciamento de Projetos</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="abrirNovoProjeto">Novo Projeto</v-btn>
      </v-card-title>

      <!-- Tabela de Projetos -->
      <v-data-table :headers="[
        { title: 'Nome', key: 'nome' },
        { title: 'Descrição', key: 'descricao' },
        { title: 'Orçamento', key: 'orcamento' },
        { title: 'Ações', key: 'acoes', sortable: false }
      ]" :items="projetos" class="elevation-1">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.nome }}</td>
            <td>{{ item.descricao }}</td>
            <td>{{ item.orcamento }}</td>
            <td>
              <v-btn icon color="blue" @click="editarProjeto(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="excluirProjeto(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal de Cadastro/Edição -->
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ projetoSelecionado.id ? 'Editar Projeto' : 'Novo Projeto' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Nome -->
            <v-text-field
              v-model="projetoSelecionado.nome"
              label="Nome"
              required
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Descrição -->
            <v-text-field
              v-model="projetoSelecionado.descricao"
              label="Descrição"
              required
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Orçamento -->
            <v-text-field
              v-model.number="projetoSelecionado.orcamento"
              label="Orçamento"
              type="number"
              required
              class="mb-4"
              outlined
            ></v-text-field>

            <v-row>
              <v-col :cols="adjustDatesContainer ? 12 : 4">
                <span>Data de Início</span>
                <v-date-picker
                  v-model="projetoSelecionado.dataInicio"
                  :min="new Date()"
                  required
                  class="mb-4"
                  outlined
                ></v-date-picker>
              </v-col>

              <v-col :cols="adjustDatesContainer ? 12 : 4">
                <span>Data Prevista de Fim</span>
                <v-date-picker
                  v-model="projetoSelecionado.dataPrevistaFim"
                  required
                  class="mb-4"
                  outlined
                ></v-date-picker>
              </v-col>

              <v-col :cols="adjustDatesContainer ? 12 : 4">
                <span>Data de Término</span>
                <v-date-picker
                  v-model="projetoSelecionado.dataFim"
                  :clearable="true"
                  class="mb-4"
                  outlined
                ></v-date-picker>
              </v-col>
            </v-row>

            <!-- Financiador (Dropdown) -->
            <v-select
              v-model="projetoSelecionado.financiadorId"
              label="Fornecedor"
              :items="financiadores"
              item-title="nome"
              item-value="id"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="grey" @click="dialog = false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="salvarProjeto">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.v-dialog {
  max-width: 75vw;
}

.v-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.v-card-text {
  padding: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

/* Responsividade para telas menores que 1164px */
@media (max-width: 1164px) {
  .v-dialog {
    max-width: 95vw;
  }
}
</style>
