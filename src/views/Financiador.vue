<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { IFinanciador } from '../models/Entities/Financiador';
  import { Financiador } from '../models/Entities/Financiador';
  import FinanciadorController from '../controllers/FinanciadorController';
  import GenericSnackbar from '../components/GenericSnackbar.vue';
  import type { IProjeto } from '../models/Entities/Projeto';
  import { Projeto } from '../models/Entities/Projeto';
  import ProjetoController from '../controllers/ProjetoController';
  

  const financiadorController = new FinanciadorController();
  const projetoController = new ProjetoController();

  const snackbar = ref(false);
  const mensagemSnackbar = ref('');
  const corSnackbar = ref('');

  const financiadores = ref<IFinanciador[]>([]);
  const projetos = ref<IProjeto[]>([]);

  const dialog = ref(false);


  function snackbarSuccess(mensagem?: string) {
    corSnackbar.value = 'success';
    snackbar.value = true;
    mensagemSnackbar.value = mensagem || 'Ação concluída com sucesso!';
  }

  function snackbarError(mensagem?: string) {
    corSnackbar.value = 'error';
    snackbar.value = true;
    mensagemSnackbar.value = mensagem || 'Ocorreu um erro!';
  }


  const carregarFinanciadores = async () => {
    financiadores.value = await financiadorController.getAll();
  }

  const carregarProjetos = async () => {
  projetos.value = await projetoController.getAll()
  }



  const cadastrarFinanciador = () => {
    financiadorSelecionado.value = new Financiador(0, '', '');
    dialog.value = true;
  };

  const criarFinanciador = async () => {
    try {
      await financiadorController.create(financiadorSelecionado.value);
      snackbarSuccess('Financiador criada com sucesso!');
      dialog.value = false;
      await carregarFinanciadores();
    } catch (error) {
      console.error('Erro ao criar financiador:', error);
      snackbarError();
    }
  }

  const editarFinanciador = (financiador: IFinanciador) => {
    financiadorSelecionado.value = { ...financiador };
    dialog.value = true;
  }

  const atualizarFinanciador = async () => {
    try {
      if (financiadorSelecionado.value.Id) {
        await financiadorController.update(financiadorSelecionado.value.Id, financiadorSelecionado.value);
        snackbarSuccess('Financiador atualizado com sucesso!');
        dialog.value = false;
        await carregarFinanciadores();
      }
    } catch (error) {
      console.error('Erro ao atualizar financiador:', error);
      snackbarError();
    }
  }

  const excluirFinanciador = async (Id: number) => {
    if (confirm('Deseja realmente excluir este financiador?')) {
      await carregarProjetos();

      const existeProjetoAssociado = projetos.value.some(p => p.financiadorId === Id);

      if (existeProjetoAssociado) {
      alert('Este financiador não pode ser excluído porque está associado a um ou mais projetos.');
      return;
      }

      await financiadorController.delete(Id);
      await carregarFinanciadores();
    }
  }

  const financiadorSelecionado = ref<IFinanciador>(
    new Financiador(0, '', '')
  );

  const rules = {
    required: (v: any) => (
      v === null || v === undefined || v === '' ? 'Campo obrigatório' : true
    )
  }


  onMounted(() => {
    carregarFinanciadores();
  });

</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Gerenciamento de Financiadores</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="cadastrarFinanciador">Novo Financiador</v-btn>
      </v-card-title>

      <v-data-table :headers="[
        { title: 'Nome', key: 'Nome' },
        { title: 'Email', key: 'Email' },
      ]" :items="financiadores" class="elevation-1">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.Nome }}</td>
            <td>{{ item.Email }}</td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">

              <v-btn icon color="blue" size="small" @click="editarFinanciador(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirFinanciador(item.Id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="text-h5"> {{ financiadorSelecionado.Id ? 'Editar Financiador' : 'Cadastrar Financiador' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Nome -->
            <label class="required-label">Nome</label>
            <v-text-field
              v-model="financiadorSelecionado.Nome"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Email -->
            <label class="required-label">Email</label>
            <v-text-field
              v-model="financiadorSelecionado.Email"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

      <v-card-actions>
          <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" @click="criarFinanciador">Salvar</v-btn>
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
