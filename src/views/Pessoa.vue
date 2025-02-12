<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { PessoaRequest, type IPessoaRequest, type IPessoaResponse } from '../models/Entities/Pessoa';
  import GenericSnackbar from '../components/GenericSnackbar.vue';
  import PessoaController from '../controllers/PessoaController';
  import CargoController from '@/controllers/CargoController';
  import type { IBolsa } from '@/models/Entities/Bolsa';

  /////////////////////// Snackbar ///////////////////////
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
  ////////////////////////////////////////////////////////

  const rules = {
    required: (v: any) => (v === null || v === undefined || v === '' ? "Campo obrigatório" : true),
  };

  // Valores padrões para pessoa (POST)
  const pessoaPadrao = () =>
    new PessoaRequest(
      0,
      '',
      '',
      '',
      '',
    )

  // Estados reativos
  const loading = ref(false);
  const pessoas = ref<IPessoaResponse[]>([]);
  const modalCadastro = ref(false); // Estado do modal
  const modalEdicao = ref(false);
  const modalBolsas = ref(false);
  const modalDetalhesBolsa = ref(false);
  const novaPessoa = ref<IPessoaRequest>(pessoaPadrao()); // Pessoa para cadastro
  const pessoaSelecionada = ref<IPessoaRequest | null>(null); // Pessoa selecionada para edição

  // Cabeçalhos da tabela
  const headers = [
    { title: 'ID', key: 'Id' },
    { title: 'Nome', key: 'Nome' },
    { title: 'Email', key: 'Email' },
    { title: 'Telefone', key: 'Telefone' },
    { title: 'CPF', key: 'Cpf' },
    { title: 'Ações', key: 'actions', sortable: false }
  ];

  // Função para carregar as pessoas
  async function carregarPessoas() {
    loading.value = true;
    const controller = new PessoaController();
    try {
      pessoas.value = await controller.getAll();
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    } finally {
      loading.value = false;
    }
  }

  const abrirNovaPessoa = () => {
    novaPessoa.value = pessoaPadrao(); // Garante que um novo objeto será criado
    modalCadastro.value = true;
  };

  const abrirEdicaoPessoa = async (pessoa: any) => {
    try {
      console.log("Pessoa", pessoa);
      if (!pessoa) {
        snackbarError('Erro ao carregar pessoa!');
        return;
      }
      pessoaSelecionada.value = new PessoaRequest (
        pessoa.Id,
        pessoa.Nome,
        pessoa.Email,
        pessoa.Telefone,
        pessoa.Cpf,
      );
      modalEdicao.value = true;
    } catch (error) {
      console.error('Erro ao carregar pessoa:', error);
    }
  }

  const criarNovaPessoa = async () => {
    const controllerPessoa = new PessoaController();
    try {
      const pessoaCriada = await controllerPessoa.create(novaPessoa.value);
      if (!pessoaCriada || !pessoaCriada.data.id) {
        throw new Error("Erro ao obter o ID da pessoa criada.");
      }

      snackbarSuccess('Pessoa criada com sucesso!');
      modalCadastro.value = false;
      await carregarPessoas(); // Recarrega a lista após criar
    } catch (error) {
      console.error('Erro ao criar pessoa:', error);
    }
  };

  // Função para editar uma pessoa
  async function salvarEdicao(id: number) {
    if (!pessoaSelecionada.value) {
      snackbarError('Erro ao salvar edição!');
      return;
    }

    const controller = new PessoaController();
    try {
      await controller.update(id, pessoaSelecionada.value);
      snackbarSuccess('Pessoa editada com sucesso!');
      await carregarPessoas(); // Recarrega a lista após editar
      modalEdicao.value = false;
    } catch (error) {
      console.error('Erro ao editar pessoa:', error);
    }
  }

  // Função para deletar uma pessoa
  async function deletarPessoa(id: number) {
    const confirmacao = confirm('Tem certeza que deseja deletar esta pessoa?');
    if (confirmacao) {
      const controller = new PessoaController();
      try {
        await controller.delete(id);
        await carregarPessoas(); // Recarrega a lista após deletar
        snackbarSuccess('Pessoa deletada com sucesso!');
      } catch (error) {
        snackbarError('Erro ao deletar pessoa!');
        console.error('Erro ao deletar pessoa:', error);
      }
    }
  }

  // Carrega as pessoas quando o componente é montado
  onMounted(() => {
    carregarPessoas();
  });

</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Gerenciamento de Pessoas</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="abrirNovaPessoa">Cadastrar Pessoa</v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="pessoas"
        :loading="loading"
        loading-text="Carregando... Aguarde"
        no-data-text="Nenhuma pessoa encontrada"
      >
        <template v-slot:item.actions="{ item }">
          <td style="display: flex; gap: 0.5rem; align-items: center;">
            <v-btn icon color="blue" size="small" @click="abrirEdicaoPessoa(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" size="small" @click="deletarPessoa(item.Id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>

        </template>
      </v-data-table>
    </v-card>

    <!-- Modal de Cadastro -->
    <v-dialog v-model="modalCadastro">
      <v-card>
        <v-card-title>
          <span class="text-h5">Cadastrar Pessoa</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="Nome"
              v-model="novaPessoa.Nome"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="novaPessoa.Email"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
            <v-text-field
              label="Telefone"
              v-model="novaPessoa.Telefone"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
            <v-text-field
              label="Cpf"
              v-model="novaPessoa.Cpf"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="modalCadastro = false">Cancelar</v-btn>
          <v-btn color="green" @click="criarNovaPessoa">Salvar</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- Modal de Edição -->
    <v-dialog v-model="modalEdicao">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Pessoa</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="Nome"
              v-model="pessoaSelecionada.Nome"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="pessoaSelecionada.Email"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
            <v-text-field
              label="Telefone"
              v-model="pessoaSelecionada.Telefone"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
            <v-text-field
              label="Cpf"
              v-model="pessoaSelecionada.Cpf"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="modalEdicao = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarEdicao(pessoaSelecionada.Id)">Salvar</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-container>
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
