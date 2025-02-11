<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { PessoaRequest, type IPessoaRequest, type IPessoaResponse } from '../models/Entities/Pessoa';
  import GenericSnackbar from '../components/GenericSnackbar.vue';
  import PessoaController from '../controllers/PessoaController';
  import type { ICargoResponse } from '@/models/Entities/Cargo';
  import CargoController from '@/controllers/CargoController';
  import HistoricoCargoController from '@/controllers/HistoricoCargoController';
  import { HistoricoCargoRequest } from '@/models/Entities/HistoricoCargo';
  import BolsaController from '@/controllers/BolsaController';
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
      -1,
    )

  const historicoCargoPadrao = () =>
    new HistoricoCargoRequest(
      0,
      new Date(),
      new Date(),
      '',
      -1,
      -1
    )

  // Estados reativos
  const loading = ref(false);
  const pessoas = ref<IPessoaResponse[]>([]);
  const cargos = ref<ICargoResponse[]>([]);
  const bolsas = ref<IBolsa[]>([]);
  const modalCadastro = ref(false); // Estado do modal
  const modalEdicao = ref(false);
  const novaPessoa = ref<IPessoaRequest>(pessoaPadrao()); // Pessoa para cadastro
  const pessoaSelecionada = ref<IPessoaRequest | null>(null); // Pessoa selecionada para edição
  const novoHistoricoCargo = ref<HistoricoCargoRequest>(historicoCargoPadrao());

  // Cabeçalhos da tabela
  const headers = [
    { title: 'ID', key: 'Id' },
    { title: 'Nome', key: 'Nome' },
    { title: 'Email', key: 'Email' },
    { title: 'Telefone', key: 'Telefone' },
    { title: 'CPF', key: 'Cpf' },
    { title: 'Cargo', key: 'CargoNome' },
    { title: 'Bolsa', key: 'BolsaNome' },
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

  async function carregarCargos() {
    loading.value = true;
    const controller = new CargoController();
    try {
      cargos.value = await controller.getAll();
    } catch (error) {
      console.error('Erro ao carregar cargos:', error);
    } finally {
      loading.value = false;
    }
  }

  async function carregarBolsas() {
    loading.value = true;
    const controller = new BolsaController();
    try {
      bolsas.value = await controller.getAll();
    } catch (error) {
      console.error('Erro ao carregar bolsas:', error);
    } finally {
      loading.value = false;
    }
  }

  const abrirNovaPessoa = () => {
    novaPessoa.value = pessoaPadrao(); // Garante que um novo objeto será criado
    novoHistoricoCargo.value = historicoCargoPadrao();
    carregarCargos();
    modalCadastro.value = true;
  };

  const abrirEdicaoPessoa = async (id: number) => {
    const pessoaController = new PessoaController();

    try {
      const pessoaArray = await pessoaController.getAll(id);
      if (!pessoaArray) {
        snackbarError('Erro ao carregar pessoa!');
        return;
      }

      const pessoa = pessoaArray[0];

      const bolsaCorrespondente = bolsas.value.find(b => b.Nome === pessoa.BolsaNome);
      const bolsaId = bolsaCorrespondente ? bolsaCorrespondente.Id : null;

      pessoaSelecionada.value = new PessoaRequest (
        pessoa.Id,
        pessoa.Nome,
        pessoa.Email,
        pessoa.Telefone,
        pessoa.Cpf,
        bolsaId
      );

      carregarCargos();
      carregarBolsas();
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

      await criarNovoHistorico(pessoaCriada.data);

      snackbarSuccess('Pessoa criada com sucesso!');
      modalCadastro.value = false;
      await carregarPessoas(); // Recarrega a lista após criar
    } catch (error) {
      console.error('Erro ao criar pessoa:', error);
    }
  };

  const criarNovoHistorico = async (pessoaCriada: any) => {
    const cargoController = new CargoController();
    const controllerHistorico = new HistoricoCargoController();

    const idCargo = novoHistoricoCargo.value.CargoId;
    const cargoAtual = await cargoController.getAll(idCargo);
    console.log("Cargo atual:", cargoAtual);
    console.log("Novo Historico de Cargo:", novoHistoricoCargo);
    if (!cargoAtual || !cargoAtual[0].Id) {
      throw new Error("Erro ao pegar Cargo.");
    }

    novoHistoricoCargo.value = {
      ...novoHistoricoCargo.value,
      DataInicio: new Date(),
      Descricao: `Pessoa ${pessoaCriada.nome} iniciou no cargo ${cargoAtual[0].Nome}.`,
      PessoaId: pessoaCriada.data.id,
      CargoId: novoHistoricoCargo.value.CargoId
    }

    try {
      await controllerHistorico.create(novoHistoricoCargo.value);

    } catch (error) {
      console.error('Erro ao criar histórico:', error);
    }
  }

  // Função para editar uma pessoa
  async function salvarEdicao(id: number) {
    if (!pessoaSelecionada.value) {
      snackbarError('Erro ao salvar edição!');
      return;
    }

    const controller = new PessoaController();
    try {
      await controller.update(id, pessoaSelecionada.value);
      await carregarPessoas(); // Recarrega a lista após editar
      snackbarSuccess('Pessoa editada com sucesso!');
      criarNovoHistorico(pessoaSelecionada.value);
      modalEdicao.value = false;
    } catch (error) {
      snackbarError('Erro ao editar pessoa!');
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
          <v-icon small class="mr-2" @click="abrirEdicaoPessoa(item.Id)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deletarPessoa(item.Id)">
            mdi-delete
          </v-icon>
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
            <v-select
              label="Cargo"
              v-model="novoHistoricoCargo.CargoId"
              :items="cargos"
              item-title="Nome"
              item-value="Id"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-select>
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
            <v-select
              label="Cargo"
              v-model="novoHistoricoCargo.CargoId"
              :items="cargos"
              item-title="Nome"
              item-value="Id"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="modalEdicao = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarEdicao">Salvar</v-btn>
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
