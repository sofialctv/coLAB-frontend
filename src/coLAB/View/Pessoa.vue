<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { IPessoa } from '../Models/Entities/Pessoa';
  import { Pessoa } from '../Models/Entities/Pessoa';
  import GenericSnackbar from '../../components/GenericSnackbar.vue';
  import PessoaController from '../Controllers/PessoaController';
  import type { IHistoricoCargo } from '../Models/Entities/HistoricoCargo';

  const snackbar = ref(false);
  const mensagemSnackbar = ref('');
  const corSnackbar = ref('');

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

  const rules = {
    required: (v: any) => (
      v === null || v === undefined || v === '' ? 'Campo obrigatório' : true
    )
  }

  const pessoaController = new PessoaController();
  const pessoas = ref<IPessoa[]>([]);

  const dialog = ref(false);

  const pessoaSelecionada = ref<IPessoa>(
    new Pessoa(
      0,
      '',
      '',
      '',
      '',
      undefined,
      undefined,
    )
  );

  const carregarPessoas = async () => {
    pessoas.value = await pessoaController.getAll();
  }

  const adjustDatesContainer = ref(false);
  const checkScreenSize = () => {
    adjustDatesContainer.value = window.innerWidth <= 1264;
  }

  onMounted(() => {
    carregarPessoas();
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  const novaPessoa = () => {
    pessoaSelecionada.value = new Pessoa(
      0,
      '',
      '',
      '',
      '',
      undefined,
      undefined,
    );
    dialog.value = true;
  }

  const editarPessoa = (pessoa: IPessoa) => {
    pessoaSelecionada.value = { ...pessoa };
    dialog.value = true;
  }

  const salvarPessoa = async () => {
    try {
      if (pessoaSelecionada.value.Id) {
        await pessoaController.update(pessoaSelecionada.value.Id, pessoaSelecionada.value);
        snackbarSuccess('Pessoa atualizada com sucesso!');
      } else {
        await pessoaController.create(pessoaSelecionada.value);
        snackbarSuccess('Pessoa criada com sucesso!');
      }

      dialog.value = false;
      await carregarPessoas();
    } catch (error) {
      console.error('Erro ao salvar pessoa:', error);
      snackbarError();
    }
  }

  const excluirPessoa = async (id: number) => {
    if (confirm('Deseja realmente excluir esta pessoa?')) {
      await pessoaController.delete(id);
      await carregarPessoas();
    }
  }

  async function abrirDialog(pessoaId: number) {
    await carregarHistoricos(pessoaId);
    dialog.value = true;
  }

  const historicos = ref<IHistoricoCargo[]>([]);
  async function carregarHistoricos(pessoaId: number) {
    try {
      historicos.value = await pessoaController.getHistoricosCargo(pessoaId);
    } catch (error) {
      console.error("Erro ao buscar históricos de cargo:", error);
    };
  }
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Gerenciamento de Pessoas</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="novaPessoa">Nova Pessoa</v-btn>
      </v-card-title>

      <v-data-table :headers="[
        { title: 'Nome', key: 'Nome' },
        { title: 'CPF', key: 'CPF' },
        { title: 'Email', key: 'Email' },
        { title: 'Telefone', key: 'Telefone' },
        { title: 'Bolsa', key: 'Bolsa' },
        { title: 'Ações', key: 'acoes', sortable: false },
      ]" :items="pessoas" class="elevation-1">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.Nome }}</td>
            <td>{{ item.Cpf }}</td>
            <td>{{ item.Email }}</td>
            <td>{{ item.Telefone }}</td>
            <td>{{ item.Bolsa }}</td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">
              <v-btn icon color="green" size="small" @click="carregarHistoricos(item.Id)">
                <v-icon>mdi-history</v-icon>
              </v-btn>

              <!-- Modal para exibir históricos -->
              <v-dialog v-model="dialog" max-width="500">
                <v-card>
                  <v-card-title>Históricos de Cargos</v-card-title>
                  <v-card-text>
                    <ul v-if="historicos.length > 0">
                      <li v-for="historico in historicos" :key="historico.Id">
                        Cargo: {{ historico.Cargo }} - De: {{ historico.DataInicio }} até {{ historico.DataFim }}
                      </li>
                    </ul>
                    <p v-else>Nenhum histórico encontrado.</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="red" @click="dialog = false">Fechar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn icon color="blue" size="small" @click="editarPessoa(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirPessoa(item.Id)">
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
          <span class="text-h5"> {{ pessoaSelecionada.Id ? 'Editar Pessoa' : 'Cadastrar Pessoa' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- Nome -->
            <label class="required-label">Nome</label>
            <v-text-field
              v-model="pessoaSelecionada.Nome"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Email -->
            <label class="required-label">Email</label>
            <v-text-field
              v-model="pessoaSelecionada.Email"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- Telefone -->
            <label class="required-label">Telefone</label>
            <v-text-field
              v-model="pessoaSelecionada.Telefone"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>

            <!-- CPF -->
            <label class="required-label">CPF</label>
            <v-text-field
              v-model="pessoaSelecionada.Cpf"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

      <v-card-actions>
          <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarPessoa">Salvar</v-btn>
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
