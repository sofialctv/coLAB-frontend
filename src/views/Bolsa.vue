<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BolsaController from '../controllers/BolsaController';
import type { IBolsa } from '../models/Entities/Bolsa';
import type { IPessoaResponse } from '../models/Entities/Pessoa';
import type { IProjeto } from '../models/Entities/Projeto';
import { Bolsa } from '../models/Entities/Bolsa';
import { Escolaridade } from '../models/Entities/Enums/Escolaridade';
import GenericSnackbar from '../components/GenericSnackbar.vue';
import PessoaController from '../controllers/PessoaController';
import ProjetoController from '../controllers/ProjetoController';
import { toRaw } from "vue";


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
const pessoas = ref<IPessoaResponse[]>([]);
const projetos = ref<IProjeto[]>([]);

// Estado do modal e bolsa editável
const dialog = ref(false);
// Correção da instância de bolsaSelecionada
const bolsaSelecionada = ref<IBolsa>(
  new Bolsa(
    0,                   // Id
    0,                   // Valor
    null,                // Nome (número ou null)
    "",                  // PlanoTrabalho
    new Date(),          // DataInicio
    new Date(),          // DataFim
    new Date(),          // DataPrevistaFim
    true,                // Ativo
    null,                // PessoaId
    "",                  // PessoaNome
    null,                // ProjetoId
    "",                  // ProjetoNome
    Escolaridade.Tecnico // Escolaridade
  )
);



// Carregar dados ao iniciar


const carregarBolsas = async () => {
  bolsas.value = await bolsaController.getAll();

  console.log("Dados recebidos:", toRaw(bolsas.value)); // Verifica os dados sem Proxy
  console.log("Tipo de bolsas.value:", typeof bolsas.value);

  if (Array.isArray(toRaw(bolsas.value)) && bolsas.value.length > 0) {
    const primeiraBolsa = toRaw(bolsas.value[0]);
    console.log("Primeiro item:", primeiraBolsa);
    console.log("Chaves do primeiro item:", Object.keys(primeiraBolsa));
    console.log("Nome:", primeiraBolsa.Nome); // Agora pode funcionar
  } else {
    console.log("A lista de bolsas está vazia ou não é um array.");
  }
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
  bolsaSelecionada.value = new Bolsa(
    0,                   // Id
    0,                   // Valor
    null,                // Nome (número ou null)
    "",                  // PlanoTrabalho
    new Date(),          // DataInicio
    new Date(),          // DataFim
    new Date(),          // DataPrevistaFim
    true,                // Ativo
    null,                // PessoaId
    "",                  // PessoaNome
    null,                // ProjetoId
    "",                  // ProjetoNome
    Escolaridade.Tecnico // Escolaridade
  );
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
          { title: 'Nome', key: 'Nome' },
          { title: 'Plano de Trabalho', key: 'PlanoTrabalho' },
          { title: 'Pessoa', key: 'PessoaNome' },
          { title: 'Data Início', key: 'DataInicio' },
          { title: 'Data Fim', key: 'DataFim' },
          { title: 'Data prevista de Fim', key: 'DataPrevistaFim' },
          { title: 'Está ativa?', key: 'Ativo' },
          { title: 'Ações', key: 'acoes', sortable: false }
        ]"
        :items="bolsas"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>  {{ item.Nome }} </td>
            <td>  {{ item.PlanoTrabalho }} </td>
            <td>  {{ item.PessoaNome }} </td>
            <td>  {{ item.DataInicio }} </td>
            <td>  {{ item.DataFim }} </td>
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

