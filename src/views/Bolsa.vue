<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BolsaController from '../controllers/BolsaController';
import type { IBolsa } from '../Models/Entities/Bolsa';
import { Bolsa } from '../Models/Entities/Bolsa';
import GenericSnackbar from '../components/GenericSnackbar.vue';
import PessoaController from '../controllers/PessoaController';
import TipoBolsaController from '../controllers/TipoBolsaController';
import ProjetoController from '../controllers/ProjetoController';

const tiposBolsa = ref([]); // Lista de tipos de bolsa existentes
const novoTipoBolsa = ref(''); // Novo tipo de bolsa (caso queira criar)
const isNovoTipoBolsa = ref(false); // Flag para exibir o campo de novo tipo

// Função para carregar os tipos de bolsa
const carregarTiposBolsa = async () => {
  // Supondo que você tenha um controller para gerenciar os tipos de bolsa
  tiposBolsa.value = await TipoBolsaController.getAll();
};

// Função para verificar se é novo tipo de bolsa
const handleTipoBolsaChange = (tipoBolsaId: any) => {
  if (!tipoBolsaId) {
    isNovoTipoBolsa.value = true;
  } else {
    isNovoTipoBolsa.value = false;
  }
};

// Função para criar novo tipo de bolsa
const criarNovoTipoBolsa = async () => {
  if (novoTipoBolsa.value) {
    try {
      const tipoBolsaCriado = await tipoBolsaController.create({ descricao: novoTipoBolsa.value });
      tiposBolsa.value.push(tipoBolsaCriado); // Adiciona o novo tipo à lista
      bolsaSelecionada.value.TipoBolsa = tipoBolsaCriado.id; // Associa o novo tipo à bolsa
      snackbarSuccess('Novo tipo de bolsa criado com sucesso!');
    } catch (error) {
      snackbarError('Erro ao criar tipo de bolsa');
    }
  }
};

onMounted(() => {
  carregarTiposBolsa(); // Carrega os tipos de bolsa existentes ao montar o componente
});

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

// Instâncias dos controllers
const pessoaController = new PessoaController();
const projetoController = new ProjetoController();
const bolsaController = new BolsaController();

// Listas
const bolsas = ref<IBolsa[]>([]);
const pessoas = ref<IPessoa[]>([]);
const projetos = ref<IProjeto[]>([]);

// Estado do modal e bolsa editável
const dialog = ref(false);
const bolsaSelecionada = ref<IBolsa>(
  new Bolsa(0, 0, new Date(), new Date(), true, null, null, null, new Date())
);

// Carregar dados ao iniciar
const carregarBolsas = async () => {
  bolsas.value = await bolsaController.getAll();
};

const carregarPessoas = async () => {
  pessoas.value = await pessoaController.getAll();
};

const carregarProjetos = async () => {
  projetos.value = await projetoController.getAll();
};

onMounted(() => {
  carregarBolsas();
  carregarPessoas();
  carregarProjetos();
});

// Abrir modal para adicionar nova bolsa
const abrirNovaBolsa = () => {
  bolsaSelecionada.value = new Bolsa(0, 0, new Date(), new Date(), true, null, null, null, new Date());
  dialog.value = true;
};


const formatarDataParaISO = (dataString: string | Date) => {
  const data = new Date(dataString);
  return data.toISOString(); // Retorna a data em formato ISO completo
};

const formatarDataParaYYYYMMDD = (dataISO: string | Date) => {
  const data = new Date(dataISO);
  return data.toISOString().split('T')[0]; // Retorna a parte YYYY-MM-DD
};


// Abrir modal para edição
const editarBolsa = (bolsa: IBolsa) => {
  bolsaSelecionada.value = {
    ...bolsa,
    DataInicio: formatarDataParaYYYYMMDD(bolsa.DataInicio),
    DataPrevistaFim: formatarDataParaYYYYMMDD(bolsa.DataPrevistaFim),
    DataFim: bolsa.DataFim ? formatarDataParaYYYYMMDD(bolsa.DataFim) : null,
  };
  dialog.value = true;
};

// Salvar bolsa (criação ou edição)
const salvarBolsa = async () => {
  try {
    // Certifique-se de que as datas estão no formato correto ao salvar
    bolsaSelecionada.value.DataInicio = formatarDataParaISO(bolsaSelecionada.value.DataInicio);
    bolsaSelecionada.value.DataPrevistaFim = formatarDataParaISO(bolsaSelecionada.value.DataPrevistaFim);
    bolsaSelecionada.value.DataFim = bolsaSelecionada.value.DataFim
      ? formatarDataParaISO(bolsaSelecionada.value.DataFim)
      : null;

    if (bolsaSelecionada.value.Id) {
      await bolsaController.update(bolsaSelecionada.value.Id, bolsaSelecionada.value);
      snackbarSuccess('Bolsa atualizada com sucesso!');
    } else {
      await bolsaController.create(bolsaSelecionada.value);
      snackbarSuccess('Bolsa criada com sucesso!');
    }
    dialog.value = false;
    await carregarBolsas();
  } catch (error) {
    console.error("Erro ao salvar bolsa:", error);
    snackbarError('Erro ao salvar bolsa.');
  }
};


// Excluir bolsa
const excluirBolsa = async (Id: number) => {
  if (confirm('Tem certeza que deseja excluir esta bolsa?')) {
    try {
      await bolsaController.delete(Id);
      snackbarSuccess('Bolsa excluída com sucesso!');
      await carregarBolsas();
    } catch (error) {
      console.error("Erro ao excluir bolsa:", error);
      snackbarError('Erro ao excluir bolsa.');
    }
  }
};

</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Gerenciamento de Bolsas</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="abrirNovaBolsa">Nova Bolsa</v-btn>
      </v-card-title>

      <!-- Tabela de Bolsas -->
      <v-data-table
        :headers="[
          { title: 'Tipo', key: 'TipoBolsaNome' },
          { title: 'Data Início', key: 'DataInicio' },
          { title: 'Data prevista de Fim', key: 'DataPrevistaFim' },
          { title: 'Está ativa?', key: 'Ativo' },
          { title: 'Ações', key: 'acoes', sortable: false }
        ]"
        :items="bolsas"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>  {{ item.TipoBolsaNome }}  </td>
            <td>  {{ item.DataInicio }} </td>
            <td>  {{ item.DataPrevistaFim }}  </td>
            <td>  {{ item.Ativo ? 'Sim' : 'Não' }}  </td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="blue" size="small" @click="editarBolsa(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirBolsa(item.Id!)">
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
          <span class="text-h5">{{ bolsaSelecionada.Id ? 'Editar Bolsa' : 'Nova Bolsa' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- TipoBolsa -->

            <label class="required-label">TipoBolsa</label>
            <v-select
              v-model="bolsaSelecionada.TipoBolsa"
              :items="tiposBolsa"
              item-title="descricao"
              item-value="id"
              label="Selecione ou crie um tipo de bolsa"
              @change="handleTipoBolsaChange"
              class="mb-4"
              outlined
            ></v-select>
            <v-text-field
              v-if="isNovoTipoBolsa"
              v-model="novoTipoBolsa"
              label="Novo Tipo de Bolsa"
              outlined
              class="mb-4"
              @blur="criarNovoTipoBolsa"
            />


            <!-- Seleção múltipla de Pessoas -->
            <label class="required-label">Pessoas</label>
            <v-select
              v-model="bolsaSelecionada.PessoaId"
              :items="pessoas"
              item-title="Nome"
              item-value="Id"
              multiple
              class="mb-4"
              outlined
            ></v-select>

            <!-- Projeto -->
            <div class="grid-item">
              <label class="required-label">Projeto</label>
              <v-select
                v-model="bolsaSelecionada.ProjetoId"
                :items="projetos"
                :rules="[rules.required]"
                item-title="nome"
                item-value="id"
                class="mb-4"
                outlined
                :clearable="true"
              ></v-select>
            </div>

            <label class="required-label">Status</label>
            <v-select
              v-model="bolsaSelecionada.Ativo"
              :items="[{ text: 'Ativo', value: true }, { text: 'Inativo', value: false }]"
              item-title="text"
              item-value="value"
              class="mb-4"
              outlined
            ></v-select>

            <v-row>
              <!-- Data de Início -->
              <v-col :cols="adjustDatesContainer ? 12 : 4">
                <label class="required-label">Data de Início</label>
                <v-text-field
                  v-model="bolsaSelecionada.DataInicio"
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
                  v-model="bolsaSelecionada.DataPrevistaFim"
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
                  v-model="bolsaSelecionada.DataFim"
                  type="date"
                  class="mb-4"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarBolsa">Salvar</v-btn>
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

