<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjetoController from '../Controllers/ProjetoController'
import type { IProjeto } from '../Models/Entities/Projeto'
import { Projeto } from '../Models/Entities/Projeto'
import GenericSnackbar from '@/view/generic/GenericSnackbar.vue'
import { ProjetoStatus } from '../Models/Entities/Enums/ProjetoStatus'

const snackbar = ref(false);
const mensagemSnackbar = ref('');
const corSnackbar = ref('');

function snackbarSuccess(message?: string) {
  corSnackbar.value = 'success';
  snackbar.value = true;
  mensagemSnackbar.value = message || 'Ação concluída com sucesso!';
}

function snackbarError(message?: string) {
  corSnackbar.value = 'error';
  snackbar.value = true;
  mensagemSnackbar.value = message || 'Ocorreu um erro!';
}

const rules = {
  required: (v: any) => (v === null || v === undefined || v === '' ? "Campo obrigatório" : true),
};

// Definindo a lista de financiadores (somente exemplo)
const financiadores = ref<any[]>([])

// Instância do controller
const projetoController = new ProjetoController()

// Lista de projetos
const projetos = ref<IProjeto[]>([])

// Estado do modal e projeto editável
const dialog = ref(false)
const projetoSelecionado = ref<IProjeto>(new Projeto(null, '', new Date(), null, new Date(), '', 0, null, '', 1))

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
    { id: 1, nome: 'Financiador Exemplo A' },
    { id: 2, nome: 'Financiador Exemplo B' },
    { id: 3, nome: 'Financiador Exemplo C' }
  ]

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

// Abrir modal para adicionar novo projeto
const abrirNovoProjeto = () => {
  projetoSelecionado.value = new Projeto(null, '', new Date(), null, new Date(), '', 0, null, '', 1)
  dialog.value = true
}

// Abrir modal para edição
const editarProjeto = (projeto: IProjeto) => {
  projetoSelecionado.value = {
    ...projeto,
    dataInicio: formatarDataParaYYYYMMDD(projeto.dataInicio),
    dataPrevistaFim: formatarDataParaYYYYMMDD(projeto.dataPrevistaFim),
    dataFim: projeto.dataFim ? formatarDataParaYYYYMMDD(projeto.dataFim) : null,
  };
  dialog.value = true;
}

const formatarDataParaISO = (dataString: string | Date) => {
  const data = new Date(dataString);
  return data; // Retorna no formato correto
};

const formatarDataParaYYYYMMDD = (dataISO: string | Date) => {
  const data = new Date(dataISO);
  return data.toISOString().split('T')[0]; // Retorna apenas a parte YYYY-MM-DD
};

// Lista de opções do dropdown baseada no enum
const statusOptions = Object.keys(ProjetoStatus)
  .filter((key) => isNaN(Number(key))) // Filtra apenas as chaves do enum (ignorando os valores numéricos)
  .map((key) => ({
    text: key, // Nome do status
    value: ProjetoStatus[key as keyof typeof ProjetoStatus], // Valor numérico correspondente
  }));

// Salvar projeto (criação ou edição)
const salvarProjeto = async () => {
  try {
    // Converte para formato ISO 8601
    const projetoParaSalvar = {
      ...projetoSelecionado.value,
      dataInicio: formatarDataParaISO(projetoSelecionado.value.dataInicio),
      dataPrevistaFim: formatarDataParaISO(projetoSelecionado.value.dataPrevistaFim),
      dataFim: projetoSelecionado.value.dataFim ? formatarDataParaISO(projetoSelecionado.value.dataFim) : null,
    };

    // Verifica se é edição ou criação
    if (projetoSelecionado.value.id) {
      await projetoController.update(projetoSelecionado.value.id, projetoParaSalvar);
      snackbarSuccess('Projeto atualizado com sucesso!');
    } else {
      await projetoController.create(projetoParaSalvar);
      snackbarSuccess('Projeto criado com sucesso!');
    }

    dialog.value = false;
    await carregarProjetos();
  } catch (error) {
    console.error("Erro ao salvar projeto:", error);
    snackbarError('Erro ao salvar projeto.');
  }
};

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
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="blue" size="small" @click="editarProjeto(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirProjeto(item.id!)">
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
            <label class="required-label">Nome</label>
            <v-text-field
              v-model="projetoSelecionado.nome"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Descrição -->
            <label class="required-label">Descrição</label>
            <v-text-field
              v-model="projetoSelecionado.descricao"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>

            <div class="grid-container">
              <!-- Orçamento -->
              <div class="grid-item">
                <label class="required-label">Orçamento</label>
                <v-text-field
                  v-model.number="projetoSelecionado.orcamento"
                  type="number"
                  :rules="[rules.required]"
                  class="mb-4"
                  outlined
                ></v-text-field>
              </div>

              <!-- Financiador -->
              <div class="grid-item">
                <label class="required-label">Fornecedor</label>
                <v-select
                  v-model="projetoSelecionado.financiadorId"
                  :items="financiadores"
                  :rules="[rules.required]"
                  item-title="nome"
                  item-value="id"
                  class="mb-4"
                  outlined
                  :clearable="true"
                ></v-select>
              </div>
            </div>

            <!-- Status -->
            <label class="required-label">Status</label>
            <v-select
              v-model="projetoSelecionado.status"
              :items="statusOptions"
              item-title="text"
              item-value="value"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-select>

            <v-row>
              <!-- Data de Início -->
              <v-col :cols="adjustDatesContainer ? 12 : 4">
                <label class="required-label">Data de Início</label>
                <v-text-field
                  v-model="projetoSelecionado.dataInicio"
                  :rules="[rules.required]"
                  type="date"
                  class="mb-4"
                  outlined
                ></v-text-field>
              </v-col>

              <!-- Data Prevista de Fim -->
              <v-col :cols="adjustDatesContainer ? 12 : 4">
                <label class="required-label">Data Prevista de Fim</label>
                <v-text-field
                  v-model="projetoSelecionado.dataPrevistaFim"
                  :rules="[rules.required]"
                  type="date"
                  class="mb-4"
                  outlined
                ></v-text-field>
              </v-col>

              <!-- Data de Término (NÃO OBRIGATÓRIA) -->
              <v-col :cols="adjustDatesContainer ? 12 : 4">
                <label>Data de Término</label>
                <v-text-field
                  v-model="projetoSelecionado.dataFim"
                  type="date"
                  class="mb-4"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
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

  <GenericSnackbar
    v-model="snackbar"
    :text="mensagemSnackbar"
    :color="corSnackbar"
    :timeout="3000"
  />
</template>

<style scoped>
/* Estiliza os rótulos com asterisco vermelho */
.required-label::after {
  content: " *";
  color: red;
  font-weight: bold;
}

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

.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* Divide em 12 colunas */
  gap: 16px; /* Espaçamento entre os elementos */
}

.grid-item {
  grid-column: span 6; /* Cada item ocupa 6 colunas */
}

.date-label {
  display: block;
  font-size: 14px;
  font-weight: bold;
}

/* Responsividade para telas menores que 1164px */
@media (max-width: 1164px) {
  .v-dialog {
    max-width: 95vw;
  }

  .grid-item {
    grid-column: span 12;
  }
}
</style>
