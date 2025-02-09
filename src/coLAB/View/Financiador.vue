<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FinanciadorController from '../Controllers/FinanciadorController'
import type { IFinanciador } from '../Models/Entities/Financiador'
import { Financiador } from '../Models/Entities/Financiador'
import GenericSnackbar from '@/view/generic/GenericSnackbar.vue'

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

// Instância do controller
  const financiadorController = new FinanciadorController()

// Lista de projetos
  const projetos = ref<IFinanciador[]>([])

// Estado do modal e projeto editável
const dialog = ref(false)
  const projetoSelecionado = ref<IFinanciador>(new Financiador(0, '', ''))

// Carregar projetos ao iniciar
const carregarFinanciadores = async () => {
  projetos.value = await financiadorController.getAll()
}

// Verificando se a tela é menor que 1164px
const adjustDatesContainer = ref(false)

const checkScreenSize = () => {
  adjustDatesContainer.value = window.innerWidth <= 1264
}

onMounted(() => {
  carregarFinanciadores()

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

// Abrir modal para adicionar novo financiador
const CadastrarNovoFinanciador = () => {
  financiadorSelecionado.value = new Financiador(0, '', '')
  dialog.value = true
}

// Abrir modal para edição
  const editarFinanciador = (financiador: IFinanciador) => {
  financiadorSelecionado.value = {
    ...financiador,
    nome: financiador.nome,
    email: financiador.email,
  };
  dialog.value = true;
}

// Salvar projeto (criação ou edição)
const salvarProjeto = async () => {
  try {

    // Verifica se é edição ou criação
    if (financiadorSelecionado.value.id) {
      await financiadorController.update(financiadorSelecionado.value.id, financiadorParaSalvar);
      snackbarSuccess('Financiador atualizado com sucesso!');
    } else {
      await financiadorController.create(financiadorParaSalvar);
      snackbarSuccess('Financiador cadastrado com sucesso!');
    }

    dialog.value = false;
    await carregarFinanciador();
  } catch (error) {
    console.error("Erro ao salvar financiador:", error);
    snackbarError('Erro ao salvar financiador.');
  }
};

// Excluir projeto
const excluirFinanciador = async (id: number) => {
  if (confirm('Tem certeza que deseja excluir este financiador?')) {
    await financiadorController.delete(id)
    await carregarFinanciador()
  }
}
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Gerenciamento de Projetos</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="cadastrarNovoFinanciador">Novo Financiador</v-btn>
      </v-card-title>

      <!-- Tabela de Projetos -->
      <v-data-table :headers="[
        { title: 'Nome', key: 'nome' },
        { title: 'Email', key: 'email' },
      ]" :items="financiadores" class="elevation-1">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.nome }}</td>
            <td>{{ item.email }}</td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="blue" size="small" @click="editarFinanciador(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirFinanciador(item.id!)">
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
          <span class="text-h5">{{ financiadorSelecionado.id ? 'Editar Financiador' : 'Novo Financiador' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Nome -->
            <label class="required-label">Nome</label>
            <v-text-field v-model="financiadorSelecionado.nome"
                          :rules="[rules.required]"
                          class="mb-4"
                          outlined></v-text-field>

            <!-- Descrição -->
            <label class="required-label">Descrição</label>
            <v-text-field v-model="financiadorSelecionado.email"
                          :rules="[rules.required]"
                          class="mb-4"
                          outlined></v-text-field>
            </div>
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

  <GenericSnackbar v-model="snackbar"
                   :text="mensagemSnackbar"
                   :color="corSnackbar"
                   :timeout="3000" />
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
